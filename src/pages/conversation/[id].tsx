import React, { ReactElement } from "react";
import { getLoggedUserId } from "../../utils/getLoggedUserId";
import { GetServerSideProps } from "next";
import { getCorrespondentName } from "../../utils/getCorrespondentName";
import ConversationDetailLayout, {
  Props as ConversationDetailProps,
} from "../../components/ConversationDetailLayout";
import { useRouter } from "next/router";
import { sendMessage } from "../../utils/sendMessage";
import { User } from "../../types/user";

interface Props extends Omit<ConversationDetailProps, "sendMessage"> {
  userId: User["id"];
}

const ConversationDetailPage = ({ userId, ...props }: Props): ReactElement => {
  const router = useRouter();
  const conversationId = +router.query.id;
  const refreshData = async () => {
    await router.replace(router.asPath);
  };

  return (
    <ConversationDetailLayout
      {...props}
      sendMessage={async (body) => {
        await sendMessage({ conversationId, userId, body });
        return refreshData();
      }}
    />
  );
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
      userId,
      correspondentName,
      messages: formattedMessages,
      lastMessageTimestamp: conversation.lastMessageTimestamp,
    },
  };
}) satisfies GetServerSideProps<Props>;

export default ConversationDetailPage;
