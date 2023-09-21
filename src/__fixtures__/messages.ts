import { DisplayedMessage, Message } from "../types/message";

export const messages: Message[] = [
  {
    id: 1,
    conversationId: 1,
    timestamp: 1625637849,
    authorId: 1,
    body: "Hello",
  },
  {
    id: 2,
    conversationId: 1,
    timestamp: 1625637867,
    authorId: 2,
    body: "Goodbye",
  },
];

export const displayedMessages: DisplayedMessage[] = messages.map(
  (message, index) => ({
    ...message,
    sentByCorrespondent: index % 2 === 0,
  }),
);
