import React, {useEffect, useRef, useState} from 'react';
import s from "../styles/messages.module.css";
import Picker, {SKIN_TONE_NEUTRAL} from "emoji-picker-react";
import Button from "@material-ui/core/Button";
import sendMessage from "../ws/sendMessage";
import {useSelector} from "react-redux";

const MessageControls = () => {
  const selectedChannelId = useSelector(state => state.selectedChannelId);

  const inputRef = useRef();
  const btnRef = useRef();
  const [open, setOpen] = useState(false);

  useEffect(listenToEnterPress, [btnRef]);
  useEffect(focusInput, [selectedChannelId]);


  return (
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
  );

  function listenToEnterPress() {
    const listener = e => {
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

};

export default MessageControls;
