import React from 'react';
import axios from 'axios'
import {useDispatch} from "react-redux";
import {setToken} from "../state/reducer";
import {NavLink, useHistory} from "react-router-dom";

import {connect} from '../ws/socket';
import {func} from "prop-types";
import sendInit from "../ws/sendInit";

const AuthPage = () => {
  const loginRef = React.useRef();
  const passwordRef = React.useRef();
  const dispatch = useDispatch();

  const history = useHistory();
  return (
    <div>
      <input type="text" ref={loginRef} placeholder="Login"/>
      <input type="text" ref={passwordRef} placeholder="Register"/> <br/>
      <button onClick={login}>Login</button> <br/>
      <button onClick={register}>Register</button> <br/>
      <NavLink to="/">To chat</NavLink> <br/>

    </div>
  );

  async function login() {
    const response = await axios.post('/auth/login', {username: loginRef.current.value, password: passwordRef.current.value});
    if(response.status === 200) {
      dispatch(setToken(response.data.token));
      sendInit();
      history.push('/');
    }
  }

  async function register() {
    const response = await axios.post('/auth/register', {username: loginRef.current.value, password: passwordRef.current.value});
    if(response.status === 200) {
      dispatch(setToken(response.data.token));
      sendInit();
      history.push('/');
    }
  }
};

export default AuthPage;
