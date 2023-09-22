import React, { ReactElement } from "react";
import { DisplayedConversation } from "../../types/conversation";
import ConversationCard from "../ConversationCard";
import { Container } from "./styledComponents";

interface Props {
  conversations: DisplayedConversation[];
}

export default function ConversationsList({
  conversations,
}: Props): ReactElement {
  return (
    <Container>
      {conversations.map((conversation) => (
        <ConversationCard key={conversation.id} conversation={conversation} />
      ))}
    </Container>
  );
}
