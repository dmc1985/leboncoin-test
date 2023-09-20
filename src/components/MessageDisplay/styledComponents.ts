import styled from "styled-components";
import { DisplayedMessage } from "../../types/message";

type MessageDisplayProps = Pick<DisplayedMessage, "sentByCorrespondent">;

export const Container = styled.div<MessageDisplayProps>`
  display: flex;
  flex-direction: column;
  ${({ sentByCorrespondent }: MessageDisplayProps) =>
    `align-self: ${sentByCorrespondent ? "start" : "end"}`};
  width: 80%;
  align-items: center;
  justify-content: center;
  margin: 2rem;
`;
export const MessageBubble = styled.div<MessageDisplayProps>`
  border-radius: 20px;
  ${({ sentByCorrespondent }: MessageDisplayProps) =>
    `background-color: ${sentByCorrespondent ? "grey" : "deepskyblue"};
    color: ${sentByCorrespondent ? "black" : "white"};
    `};
  padding: 0.5rem 2rem;
`;

export const CorrespondentNameText = styled.span`
  color: grey;
  align-self: start;
  margin-bottom: 0.5rem;
`;
