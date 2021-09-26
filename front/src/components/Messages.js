import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import s from '../styles/messages.module.css';
import MessageControls from "./MessageControls";
import {selectChannel} from "../state/selectors";


const Messages = () => {

  const channel = useSelector(selectChannel);
  const messages = channel?.messages;
  const selectedChannelName = channel?.name;
  const isTyping = channel?.isTyping;

  const userId = useSelector(state => state.userId);

  const messagesListRef = useRef();

  useEffect(scrollMessagesToBottom, [messages?.length]);

  return (
    <section className={s.messages}>
      <header className={s.header}>
        <h1>{selectedChannelName}</h1>
      </header>
      <div className={s.messagesList} ref={messagesListRef}>
        {messages?.map((message) => (
            <Message
              author={message.author}
              text={message.text}
              date={message.date}
              isMine={message.authorId === userId}
            />
          )
        )}
      </div>
      <div className={s.isSomebodyTyping + ' ' + (isTyping ? s.visible : ' ')}>Somebody is typing...</div>
      <MessageControls/>
    </section>
  );

  function scrollMessagesToBottom() {
    messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
  }
};

const Message = ({text, author, isMine, date}) => (
  <div className={s.message + ' ' + (isMine ? s.messageMine : s.messageTheir)}>
    <h1 className={s.messageHeading}>{author} <small className={s.messageDate}>{date}</small></h1>
    <div>{text}</div>
  </div>
);


export default Messages;
