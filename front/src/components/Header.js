import React, {useRef} from 'react';
import s from '../styles/header.module.css';
import Settings from "./Settings";

const selectUsername = state => state.username;

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.headerLogo}>React chat</div>
      <div className={s.headerMenu}>
        <Settings />
      </div>
    </header>
  );
};

export default Header;
