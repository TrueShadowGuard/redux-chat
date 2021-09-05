import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import sendMessage from "../ws/sendMessage";
import s from '../styles/messages.module.css';
import Button from "@material-ui/core/Button";

const Messages = () => {
  const messages = useSelector(state => {
    const id = state.selectedChannelId;
    return state.channels.find(channel => channel.id === id)?.messages;
  });
  const [selectedChannelId, selectedChannelName] = useSelector(state => (
    [state.selectedChannelId, state.channels.find(c => c.id === state.selectedChannelId)?.name]
  ));

  const messagesListRef = useRef();
  const inputRef = useRef();
  const btnRef = useRef();

  useEffect(listenToEnterPress, [btnRef]);
  useEffect(focusInput, [selectedChannelId]);
  useEffect(scrollMessagesToBottom, [messages?.length]);

  return (
    <section className={s.messages}>
      <header className={s.header}>
        <h1>{selectedChannelName}</h1>
      </header>
      <div className={s.messagesList} ref={messagesListRef}>
        {messages?.map((message) => (
            <Message author={message.author}
                     text={message.text}/>
          )
        )}
      </div>
      <div className={s.controls}>
        <input type="text"
               className={s.messageInput}
               placeholder="Write a message"
               ref={inputRef}
        />
        <Button variant="contained"
                color="default"
                ref={btnRef}
                onClick={handleSendBtnClick}
        >Send</Button>
      </div>
    </section>
  );

  function listenToEnterPress() {
    const listener = e => {
      console.log(e)
      if (e.key !== 'Enter') return;
      btnRef.current.click();
    }
    window.addEventListener('keypress', listener);
    return () => window.removeEventListener('keypress', listener);
  }

  function focusInput() {
    inputRef.current.focus();
  }

  function handleSendBtnClick() {
    console.log('value', inputRef.current.value)
    if (inputRef.current.value === '') return;
    sendMessage(selectedChannelId, inputRef.current.value);
    inputRef.current.value = '';
  }

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
