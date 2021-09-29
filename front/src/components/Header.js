import React, {useRef} from 'react';
import s from '../styles/header.module.css';
import Settings from "./Settings";
import {useSelector} from "react-redux";
import Reconnect from "./Reconnect";

const Header = () => {
  const isReconnecting = useSelector(state => state.isReconnecting);
  return (
    <header className={s.header}>
      {isReconnecting ? <Reconnect /> : null}
      <div className={s.headerLogo}>React chat</div>
      <div className={s.headerMenu}>
        <Settings />
      </div>
    </header>
  );
};

export default Header;
