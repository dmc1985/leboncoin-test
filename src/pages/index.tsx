import type { ReactElement } from "react";
import Head from "next/head";
import { getLoggedUserId } from "../utils/getLoggedUserId";
import React from "react";
import { GetServerSideProps } from "next";
import { DisplayedConversation } from "../types/conversation";
import ConversationsList from "../components/ConversationsList";
import Container from "../components/HomePageContainer";
import { getCorrespondentName } from "../utils/getCorrespondentName";

interface Props {
  conversations: DisplayedConversation[];
}

const Home = ({ conversations }: Props): ReactElement => {
  return (
    <Container>
      <Head>
        <title>DMC - Leboncoin test</title>
        <meta
          name="description"
          content="Frontend exercise for developpers who want to join us on leboncoin.fr"
        ></meta>
      </Head>

      <ConversationsList conversations={conversations} />
    </Container>
  );
};

export const getServerSideProps = (async (context) => {
  const userId = getLoggedUserId();

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
