import { render, screen } from "@testing-library/react";
import ConversationDetailPage, {
  getServerSideProps,
} from "../pages/conversation/[id]";
import { displayedMessages, messages } from "../__fixtures__/messages";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { sendMessage } from "../utils/sendMessage";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

jest.mock("../utils/sendMessage", () => ({
  sendMessage: jest.fn(),
}));

mockRouter.useParser(createDynamicRouteParser(["conversation/[id]"]));

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: jest.fn().mockResolvedValue(messages),
  }),
);

describe("<ConversationDetailPage />", () => {
  it("should render messages", () => {
    render(
      <ConversationDetailPage
        userId={1}
        messages={displayedMessages}
        correspondentName="Thibaut"
        lastMessageTimestamp={displayedMessages[0].timestamp}
      />,
      { wrapper: MemoryRouterProvider },
    );

    expect(screen.getByText(/Hello/)).toBeInTheDocument();
    expect(screen.getByText(/Goodbye/)).toBeInTheDocument();
  });

  it("should send a message", async () => {
    await mockRouter.push("/conversation/1");

    render(
      <ConversationDetailPage
        userId={1}
        messages={displayedMessages}
        correspondentName="Thibaut"
        lastMessageTimestamp={displayedMessages[0].timestamp}
      />,
      { wrapper: MemoryRouterProvider },
    );

    const messageInput = screen.getByPlaceholderText(/Send message/);

    await userEvent.type(messageInput, "test message{enter}");

    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith({
      conversationId: 1,
      userId: 1,
      body: "test message",
    });
  });

  describe("getServerSideProps()", () => {
    it("should fetch the correct messages and conversation", async () => {
      // @ts-ignore
      const { props } = await getServerSideProps({ query: { id: "1" } });

      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(`http://localhost:3005/messages/1`);
      expect(fetch).toHaveBeenCalledWith(
        `http://localhost:3005/conversation/1`,
      );
    });
  });
});
