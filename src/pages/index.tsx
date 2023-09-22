import type { ReactElement } from "react";
import { getLoggedUserId } from "../utils/getLoggedUserId";
import React from "react";
import { GetServerSideProps } from "next";
import { DisplayedConversation } from "../types/conversation";
import { getCorrespondentName } from "../utils/getCorrespondentName";
import HomePageLayout from "../components/HomePageLayout";

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
  const conversations = await res.json();

  const formattedConversations = conversations.map((conversation) => ({
    ...conversation,
    correspondentName: getCorrespondentName({
      conversation,
      userId: getLoggedUserId(),
    }),
  }));

  return { props: { conversations: formattedConversations } };
}) satisfies GetServerSideProps<Props>;

export default Home;
