import React, { ReactElement } from "react";
import {
  Avatar,
  Container,
  DateText,
  InfoContainer,
  NameText,
} from "./styledComponents";

interface Props {
  correspondentName: string;
  lastMessageDate: string;
}

const ConversationCard = ({
  correspondentName,
  lastMessageDate,
}: Props): ReactElement => (
  <Container>
    <Avatar>{correspondentName.slice(0, 1)}</Avatar>
    <InfoContainer>
      <NameText>{correspondentName}</NameText>
      <DateText>{lastMessageDate}</DateText>
    </InfoContainer>
  </Container>
);

export default ConversationCard;
