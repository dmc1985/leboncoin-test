import React, { PropsWithChildren, ReactElement } from "react";
import { formatRelative } from "date-fns";
import { Conversation } from "../../types/conversation";
import { User } from "../../types/user";
import {
  Container,
  Header,
  HeaderText,
  MessageContainer,
  SendMessageInput,
} from "./styledComponents";
import MessageDisplay from "../MessageDisplay";
import { DisplayedMessage } from "../../types/message";

export interface Props
  extends PropsWithChildren,
    Pick<Conversation, "lastMessageTimestamp"> {
  messages: DisplayedMessage[];
  correspondentName: User["nickname"];
}

const ConversationDetailLayout = ({
  lastMessageTimestamp,
  correspondentName,
  messages,
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

export default ConversationDetailLayout;
