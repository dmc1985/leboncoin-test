import React, { ReactElement } from "react";
import { getLoggedUserId } from "../../utils/getLoggedUserId";
import { GetServerSideProps } from "next";
import { DisplayedMessage, Message } from "../../types/message";
import { getCorrespondentName } from "../../utils/getCorrespondentName";
import MessageDisplay from "../../components/MessageDisplay";
import styled from "styled-components";
import { User } from "../../types/user";
import { Conversation } from "../../types/conversation";
import { formatRelative } from "date-fns";

interface Props extends Pick<Conversation, "lastMessageTimestamp"> {
  messages: DisplayedMessage[];
  correspondentName: User["nickname"];
}

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  margin: 2rem 8rem;
  @media (max-width: 600px) {
    margin: 0.5rem;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: end;
  width: 50%;
  overflow-y: scroll;
  scrollbar-width: none;
  height: 70vh;
  @media (max-width: 600px) {
    width: 100%;
  }
  margin-top: 8rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: lightgrey;
  border-top: 1px solid black;
  height: 4rem;
`;

export const SendMessageInput = styled.input`
  height: 2rem;
  border-radius: 2rem;
  padding: 0.5rem 2rem;
  bottom: 10%;
  width: 90%;
  margin: 0 2rem;
  align-self: center;
`;

interface HeaderTextProps {
  desktopOnly?: boolean;
}

export const HeaderText = styled.span<HeaderTextProps>`
  font-weight: bold;
  @media (max-width: 600px) {
    ${({ desktopOnly }: HeaderTextProps) => `
      display: ${desktopOnly ? "none" : "hidden"}
    `}
  }
`;

const ConversationDetailPage = ({
  messages,
  lastMessageTimestamp,
  correspondentName,
}: Props): ReactElement => {
  const lastMessageDate = formatRelative(
    new Date(lastMessageTimestamp),
    new Date(),
  );

  return (
    <Container>
      <Header>
        <HeaderText>{`${correspondentName} - You`}</HeaderText>
        <HeaderText desktopOnly>{`Last message ${lastMessageDate}`}</HeaderText>
      </Header>
      <MessageContainer>
        {messages.map((message) => (
          <MessageDisplay
            key={message.id}
            message={message}
            correspondentName={correspondentName}
          />
        ))}
      </MessageContainer>
      <SendMessageInput placeholder="Send message" />
    </Container>
  );
};
export const getServerSideProps = (async (context) => {
  const { id: conversationId } = context.query;

  const res = await Promise.all([
    fetch(`http://localhost:3005/messages/${conversationId}`),
    fetch(`http://localhost:3005/conversation/${conversationId}`),
  ]);

  const [messages, conversation] = await Promise.all(
    res.map((res) => res.json()),
  );

  const userId = getLoggedUserId();

  const correspondentName = getCorrespondentName({
    conversation,
    userId,
  });

  const formattedMessages = messages.map((message) => ({
    ...message,
    sentByCorrespondent: message.authorId !== userId,
  }));

  return {
    props: {
      messages: formattedMessages,
      correspondentName,
      lastMessageTimestamp: conversation.lastMessageTimestamp,
    },
  };
}) satisfies GetServerSideProps<Props>;

export default ConversationDetailPage;
