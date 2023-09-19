import React, { ReactElement } from "react";
import { Conversation } from "../../types/conversation";
import ConversationCard from "../ConversationCard";
import { Container } from "./styledComponents";
import { format } from "date-fns";

interface Props {
  conversations: Conversation[];
}

const LAST_MESSAGE_DATE_FORMAT = "LLLL d ";

export default function ConversationsList({
  conversations,
}: Props): ReactElement {
  return (
    <Container>
      {conversations.map((conversation: Conversation) => (
        <ConversationCard
          key={conversation.id}
          correspondentName={conversation.recipientNickname}
          lastMessageDate={format(
            new Date(conversation.lastMessageTimestamp),
            LAST_MESSAGE_DATE_FORMAT,
          )}
        />
      ))}
    </Container>
  );
}
