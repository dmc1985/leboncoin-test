import React, { ReactElement } from "react";
import {
  Container,
  CorrespondentNameText,
  MessageBubble,
} from "./styledComponents";
import { DisplayedMessage } from "../../types/message";
import { User } from "../../types/user";

interface Props {
  message: DisplayedMessage;
  correspondentName: User["nickname"];
}

const MessageDisplay = ({
  message,
  correspondentName,
}: Props): ReactElement => (
  <Container sentByCorrespondent={message.sentByCorrespondent}>
    {message.sentByCorrespondent && (
      <CorrespondentNameText>{correspondentName}</CorrespondentNameText>
    )}
    <MessageBubble sentByCorrespondent={message.sentByCorrespondent}>
      {message.body}
    </MessageBubble>
  </Container>
);

export default MessageDisplay;
