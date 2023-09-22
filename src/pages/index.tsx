import type { ReactElement } from "react";
import { getLoggedUserId } from "../utils/getLoggedUserId";
import React from "react";
import { GetServerSideProps } from "next";
import { Conversation, DisplayedConversation } from "../types/conversation";
import { getCorrespondentName } from "../utils/getCorrespondentName";
import HomePageLayout from "../components/HomePageLayout";
import { getLastMessageTimestamps } from "../utils/getLastMessageTimestamps";

interface Props {
  conversations: DisplayedConversation[];
}

const Home = ({ conversations }: Props): ReactElement => (
  <HomePageLayout conversations={conversations} />
);

export const getServerSideProps = (async () => {
  const userId = getLoggedUserId();

  if (!userId)
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };

  const res = await fetch(`http://localhost:3005/conversations/${userId}`);
  const conversations: Conversation[] = await res.json();

  //this is necessary to fix an issue in the middleware where the db import is not updated with changes to the json file
  const timestampsById = await getLastMessageTimestamps(
    conversations.map((conversation) => conversation.id),
  );

  const formattedConversations = conversations.map((conversation) => ({
    ...conversation,
    correspondentName: getCorrespondentName({
      conversation,
      userId: getLoggedUserId(),
    }),
    lastMessageTimestamp: timestampsById[conversation.id],
  }));

  return { props: { conversations: formattedConversations } };
}) satisfies GetServerSideProps<Props>;

export default Home;
