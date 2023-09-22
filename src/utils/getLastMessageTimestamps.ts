import { Conversation } from "../types/conversation";

export async function getLastMessageTimestamps(
  conversationIds: Array<Conversation["id"]>,
): Promise<Record<Conversation["id"], Conversation["lastMessageTimestamp"]>> {
  const conversationsRes: Response[] = await Promise.all(
    conversationIds.map((id) =>
      fetch(`http://localhost:3005/conversation/${id}`),
    ),
  );

  const conversations: Conversation[] = await Promise.all(
    conversationsRes.map((res) => res.json()),
  );

  const timestampsById = {};

  conversations.forEach((conversation) => {
    timestampsById[conversation.id] = conversation.lastMessageTimestamp;
  });

  return timestampsById;
}
