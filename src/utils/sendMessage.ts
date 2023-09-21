import { Conversation } from "../types/conversation";
import { User } from "../types/user";
import { Message } from "../types/message";

interface SendMessageParams {
  conversationId: Conversation["id"];
  userId: User["id"];
  body: Message["body"];
}

export async function sendMessage({
  conversationId,
  userId,
  body,
}: SendMessageParams): Promise<void> {
  const now = new Date().getTime();
  await Promise.all([
    fetch(`http://localhost:3005/messages/${conversationId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        conversationId,
        timestamp: now,
        authorId: userId,
        body,
      }),
    }),
    fetch(`http://localhost:3005/conversation/${conversationId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        lastMessageTimestamp: now,
      }),
    }),
  ]);
}
