import React, {
  PropsWithChildren,
  ReactElement,
  useRef,
  useState,
} from "react";
import { formatRelative } from "date-fns";
import { Conversation } from "../../types/conversation";
import { User } from "../../types/user";
import {
  Container,
  Header,
  HeaderText,
  InputContainer,
  MessageContainer,
  SendArrowContainer,
  SendMessageInput,
} from "./styledComponents";
import MessageDisplay from "../MessageDisplay";
import { DisplayedMessage, Message } from "../../types/message";
import SendArrowIcon from "../SendArrowIcon";

export interface Props
  extends PropsWithChildren,
    Pick<Conversation, "lastMessageTimestamp"> {
  messages: DisplayedMessage[];
  correspondentName: User["nickname"];
  sendMessage: (body: Message["body"]) => Promise<void>;
}

const ConversationDetailLayout = ({
  lastMessageTimestamp,
  correspondentName,
  messages,
  sendMessage,
}: Props): ReactElement => {
  const lastMessageDate = formatRelative(
    new Date(lastMessageTimestamp),
    new Date(),
  );

  const [message, setMessage] = useState("");
  const messageContainerRef = useRef(null);

  const handleSendMessage = async () => {
    if (message) {
      setMessage("");
      await sendMessage(message);
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container>
      <Header>
        <HeaderText>{`${correspondentName} - You`}</HeaderText>
        <HeaderText desktopOnly>{`Last message ${lastMessageDate}`}</HeaderText>
      </Header>
      <MessageContainer ref={messageContainerRef}>
        {messages.map((message) => (
          <MessageDisplay
            key={message.id}
            message={message}
            correspondentName={correspondentName}
          />
        ))}
      </MessageContainer>
      <InputContainer>
        <SendMessageInput
          placeholder="Send message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              return handleSendMessage();
            }
          }}
        />
        <SendArrowContainer>
          <div onClick={() => handleSendMessage()}>
            <SendArrowIcon color="grey" />
          </div>
        </SendArrowContainer>
      </InputContainer>
    </Container>
  );
};

export default ConversationDetailLayout;
