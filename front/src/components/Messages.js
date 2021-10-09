import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import s from '../styles/messages.module.css';
import MessageControls from "./MessageControls";
import {selectChannel, selectOnline, selectUserId, selectUsername} from "../state/selectors";
import Scrollbars from 'react-custom-scrollbars';
import {NavLink} from "react-router-dom";


const Messages = () => {

  const channel = useSelector(selectChannel);

  const messages = channel?.messages;
  const selectedChannelName = channel?.name;
  const isTyping = channel?.isTyping;

  const username = useSelector(selectUsername);

  const online = useSelector(selectOnline);

  const messagesListRef = useRef();

  useEffect(scrollMessagesToBottom, [messages?.length]);

  return (
    <section className={s.messages}>
      <header className={s.header}>
        <div>Current online: {online}</div>
        <h1>{selectedChannelName}</h1>
      </header>
      <div className={s.messagesListWrapper}>
        <Scrollbars width="100%" height="100%" ref={messagesListRef}>
          <div className={s.messagesList}>
            {messages?.map((message, i) => (
                <Message
                  author={message.author}
                  text={message.text}
                  date={message.date}
                  isMine={message.author === username}
                  authorId={message.authorId}
                  key={i}
                />
              )
            )}
          </div>
        </Scrollbars>
      </div>
      <div className={s.isSomebodyTyping + ' ' + (isTyping ? s.visible : ' ')}>Somebody is typing...</div>
      <MessageControls/>
    </section>
  );

  function scrollMessagesToBottom() {
    messagesListRef.current.scrollToBottom();
  }
};

const Message = ({text, author, authorId, isMine, date}) => (
  <div className={s.message + ' ' + (isMine ? s.messageMine : s.messageTheir)}>
    <h1 className={s.messageHeading}>
      <NavLink to={"/users/" + author} className="link">{author}</NavLink>
      <small className={s.messageDate}>{date}</small>
    </h1>
    <div>{text}</div>
  </div>
);


export default Messages;
