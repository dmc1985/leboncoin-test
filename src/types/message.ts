import { User } from "./user";

export interface Message {
  id: number;
  conversationId: number;
  authorId: number;
  timestamp: number;
  body: string;
}

export interface DisplayedMessage extends Message {
  sentByCorrespondent: boolean;
}
