import { User } from "./user";

export interface Conversation {
  id: number;
  recipientId: number;
  recipientNickname: string;
  senderId: number;
  senderNickname: string;
  lastMessageTimestamp: number;
}

export interface DisplayedConversation extends Conversation {
  correspondentName: User["nickname"];
}
