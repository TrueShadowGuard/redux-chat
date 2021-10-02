import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";

import store from './state/store';
import './state/storeUtils';

import './ws/socket';

import Routes from "./Routes";

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
