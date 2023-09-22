import { fireEvent, render, screen } from "@testing-library/react";
import App, { getServerSideProps } from "../pages";
import {
  conversations,
  displayedConversations,
} from "../__fixtures__/conversations";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: jest.fn().mockResolvedValue(conversations),
  }),
);

jest.mock("../utils/getLastMessageTimestamps", () => ({
  getLastMessageTimestamps: () => ({
    1: 1695044338729,
    2: 1620284667,
    3: 1625648667,
  }),
}));

describe("<App />", () => {
  it("should render three different conversations", () => {
    render(<App conversations={displayedConversations} />);
    expect(screen.getByText(/Patrick/)).toBeInTheDocument();
    expect(screen.getByText(/Elodie/)).toBeInTheDocument();
    expect(screen.getByText(/Jeremie/)).toBeInTheDocument();
  });

  it("should link to the conversation detail page when the ConversationCard is clicked", () => {
    render(<App conversations={displayedConversations} />, {
      wrapper: MemoryRouterProvider,
    });

    const conversationCard = screen.getByText(/Jeremie/);

    fireEvent.click(conversationCard);

    expect(mockRouter.asPath).toEqual("/conversation/1");
  });

  describe("getServerSideProps()", () => {
    it("should fetch and format conversations", async () => {
      //for this test I'm mocking out the hacky fix I did for the problem with stale data
      // in the json middleware.
      const { props } = await getServerSideProps();

      expect(fetch).toHaveBeenCalledTimes(1);

      expect(props.conversations).toStrictEqual(displayedConversations);
    });
  });
});
