import React, { ReactElement } from "react";
import Head from "next/head";
import ConversationsList from "../ConversationsList";
import { DisplayedConversation } from "../../types/conversation";
import { Container, PortfolioLink, Title } from "./styledComponents";

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
    <Title>{"David Martin Cohen's Test"}</Title>
    <PortfolioLink href="https://davidmartincohen.com" target="_blank">
      To learn about me...
    </PortfolioLink>
    <ConversationsList conversations={conversations} />
  </Container>
);

export default HomePageLayout;
