import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import store from './state/store';
import './state/storeUtils';

import Routes from "./Routes";
import SaveStateInLocalStorage from "./components/SaveStateInLocalStorage";

const App = () => {

  return (
    <Provider store={store}>
      <SaveStateInLocalStorage paths={['isDarkTheme', 'username', 'userId', 'token']}>
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
      </SaveStateInLocalStorage>
    </Provider>
  );
};

export default App;
