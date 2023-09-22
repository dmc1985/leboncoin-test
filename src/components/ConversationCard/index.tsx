import React, { ReactElement } from "react";
import {
  Avatar,
  Container,
  DateText,
  InfoContainer,
  NameText,
} from "./styledComponents";
import { DisplayedConversation } from "../../types/conversation";
import { format } from "date-fns";

interface Props {
  conversation: DisplayedConversation;
}

const LAST_MESSAGE_DATE_FORMAT = "LLLL d ";

const ConversationCard = ({
  conversation: { id, correspondentName, lastMessageTimestamp },
}: Props): ReactElement => (
  <Container href={`/conversation/${id}`}>
    <Avatar>{correspondentName.slice(0, 1)}</Avatar>
    <InfoContainer>
      <NameText>{correspondentName}</NameText>
      <DateText>
        {format(new Date(lastMessageTimestamp), LAST_MESSAGE_DATE_FORMAT)}
      </DateText>
    </InfoContainer>
  </Container>
);

export default ConversationCard;
