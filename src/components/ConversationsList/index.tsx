import React, { ReactElement } from "react";
import { DisplayedConversation } from "../../types/conversation";
import ConversationCard from "../ConversationCard";
import { Container } from "./styledComponents";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  conversations: DisplayedConversation[];
}

const LAST_MESSAGE_DATE_FORMAT = "LLLL d ";

export default function ConversationsList({
  conversations,
}: Props): ReactElement {
  return (
    <Container>
      {conversations.map((conversation) => (
        <Link key={conversation.id} href={`/conversation/${conversation.id}`}>
          <ConversationCard
            correspondentName={conversation.correspondentName}
            lastMessageDate={format(
              new Date(conversation.lastMessageTimestamp),
              LAST_MESSAGE_DATE_FORMAT,
            )}
          />
        </Link>
      ))}
    </Container>
  );
}
