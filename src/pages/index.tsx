import type { ReactElement } from "react";
import Head from "next/head";
import { getLoggedUserId } from "../utils/getLoggedUserId";
import React from "react";
import { GetServerSideProps } from "next";
import { Conversation } from "../types/conversation";
import ConversationsList from "../components/ConversationsList";
import Container from "../components/HomePageContainer";

const Home = ({ conversations }): ReactElement => {
  return (
    <Container>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
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
  return { props: { conversations } };
}) satisfies GetServerSideProps<{
  conversations: Conversation[];
}>;

export default Home;
