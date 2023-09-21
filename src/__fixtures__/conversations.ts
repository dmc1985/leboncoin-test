import db from "../server/db.json";
import { Conversation, DisplayedConversation } from "../types/conversation";

export const conversations: Conversation[] = [
  {
    id: 1,
    recipientId: 2,
    recipientNickname: "Jeremie",
    senderId: 1,
    senderNickname: "Thibaut",
    lastMessageTimestamp: 1695044338729,
  },
  {
    id: 2,
    recipientId: 3,
    recipientNickname: "Patrick",
    senderId: 1,
    senderNickname: "Thibaut",
    lastMessageTimestamp: 1620284667,
  },
  {
    id: 3,
    recipientId: 1,
    recipientNickname: "Thibaut",
    senderId: 4,
    senderNickname: "Elodie",
    lastMessageTimestamp: 1625648667,
  },
];

const correspondentNames = ["Jeremie", "Patrick", "Elodie"];

export const displayedConversations: DisplayedConversation[] =
  conversations.map((conversation, index) => ({
    ...conversation,
    correspondentName: correspondentNames[index],
  }));
