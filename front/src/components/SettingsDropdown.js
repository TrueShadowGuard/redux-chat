import React, {useMemo, useState} from 'react';
import s from '../styles/settings.module.css';
import {Checkbox, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {setIsAutoTheme, setIsDarkTheme, setToken, setUsername} from "../state/reducer";

const SettingsDropdown = ({parentRef, open}) => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(state => state.isDarkTheme);
  const isAutoTheme = useSelector(state => state.isAutoTheme);
  const username = useSelector(state => state.username);

  const style = useMemo(() => {
    return {
      display: open ? 'block' : 'none',
      bottom: `-${parentRef?.current?.clientHeight}`,
      right: 0,
    }
  }, [parentRef?.current?.clientHeight, open]);

  return (
    <div className={s.settings} style={style}>
      <header className={s.header}>
        <span>Settings</span>
      </header>
      <section className={s.main}>
        <div className={s.setting}>
          <Checkbox
            color="primary"
            checked={isDarkTheme}
            disabled={isAutoTheme}
            onChange={(e) => dispatch(setIsDarkTheme(e.target.checked))}
          />
          <span>Dark theme</span>
        </div>
        <div className={`${s.setting}`}>
          <button onClick={() => dispatch(setToken(undefined))}>Sign out</button>
        </div>
      </section>
    </div>
  );
};

export default SettingsDropdown;
