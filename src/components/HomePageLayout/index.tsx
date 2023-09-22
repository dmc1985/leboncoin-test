import React, { ReactElement } from "react";
import Head from "next/head";
import ConversationsList from "../ConversationsList";
import { DisplayedConversation } from "../../types/conversation";
import { Container } from "./styledComponents";

interface Props {
  conversations: DisplayedConversation[];
}

const HomePageLayout = ({ conversations }: Props): ReactElement => (
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

export default HomePageLayout;
