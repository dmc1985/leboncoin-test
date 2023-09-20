import { Conversation } from "../types/conversation";
import { User } from "../types/user";
import { getLoggedUserId } from "./getLoggedUserId";

interface CorrespondentNameParams {
  conversation: Conversation;
  userId: User["id"];
}

export function getCorrespondentName({
  conversation,
  userId,
}: CorrespondentNameParams): User["nickname"] {
  return conversation.recipientId !== userId
    ? conversation.recipientNickname
    : conversation.senderNickname;
}
