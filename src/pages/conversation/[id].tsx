import React, { ReactElement } from "react";
import { getLoggedUserId } from "../../utils/getLoggedUserId";
import { GetServerSideProps } from "next";
import { getCorrespondentName } from "../../utils/getCorrespondentName";
import ConversationDetailLayout, {
  Props as ConversationDetailProps,
} from "../../components/ConversationDetailLayout";

const ConversationDetailPage = (
  props: ConversationDetailProps,
): ReactElement => {
  return <ConversationDetailLayout {...props} />;
};
export const getServerSideProps = (async (context) => {
  const { id: conversationId } = context.query;

  const res = await Promise.all([
    fetch(`http://localhost:3005/messages/${conversationId}`),
    fetch(`http://localhost:3005/conversation/${conversationId}`),
  ]);

  const [messages, conversation] = await Promise.all(
    res.map((res) => res.json()),
  );

  const userId = getLoggedUserId();

  const correspondentName = getCorrespondentName({
    conversation,
    userId,
  });

  const formattedMessages = messages.map((message) => ({
    ...message,
    sentByCorrespondent: message.authorId !== userId,
  }));

  return {
    props: {
      messages: formattedMessages,
      correspondentName,
      lastMessageTimestamp: conversation.lastMessageTimestamp,
    },
  };
}) satisfies GetServerSideProps<ConversationDetailProps>;

export default ConversationDetailPage;
