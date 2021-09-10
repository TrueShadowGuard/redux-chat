import React, {useEffect, useRef} from 'react';
import Picker, {SKIN_TONE_NEUTRAL} from 'emoji-picker-react';
import {useSelector} from "react-redux";
import sendMessage from "../ws/sendMessage";
import s from '../styles/messages.module.css';
import Button from "@material-ui/core/Button";
import MessageControls from "./MessageControls";


const Messages = () => {
  const messages = useSelector(state => {
    const id = state.selectedChannelId;
    return state.channels.find(channel => channel.id === id)?.messages;
  });
  const [selectedChannelId, selectedChannelName] = useSelector(state => (
    [state.selectedChannelId, state.channels.find(c => c.id === state.selectedChannelId)?.name]
  ));

  const messagesListRef = useRef();

  useEffect(scrollMessagesToBottom, [messages?.length]);

  return (
    <section className={s.messages}>
      <header className={s.header}>
        <h1>{selectedChannelName}</h1>
      </header>
      <div className={s.messagesList} ref={messagesListRef}>
        {messages?.map((message) => (
            <Message author={message.author}
                     text={message.text}
            />
          )
        )}
      </div>
      <MessageControls />
    </section>
  );

  function scrollMessagesToBottom() {
    messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
  }
};

const Message = ({author, text}) => {
  return (
    <div className={s.message}>
      <h1>{author}</h1>
      <div>{text}</div>
    </div>
  )
}

export default Messages;
