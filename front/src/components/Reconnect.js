import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import s from '../styles/reconnect.module.css';

const Reconnect = () => {

  useEffect(blurApp);

  return (ReactDOM.createPortal(
    <div className={s.wrapper}>
      <h1>Lost connection</h1>
      <div>Trying to reconnect...</div>
    </div>
  ,document.querySelector('#root')));
};

const blurApp = () => {
  const app = document.querySelector('.app');
  app.classList.add('blured');
  return () => app.classList.remove('blured');
}

export default Reconnect;
