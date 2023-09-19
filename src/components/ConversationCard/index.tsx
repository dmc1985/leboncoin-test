import React, { ReactElement } from "react";
import { Avatar, Container, InfoContainer } from "./styledComponents";

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
      <div>{correspondentName}</div>
      <div>{lastMessageDate}</div>
    </InfoContainer>
  </Container>
);

export default ConversationCard;
