import React from 'react';
import Header from "./components/Header";
import AsidePanel from "./components/AsidePanel";
import Messages from "./components/Messages";
import {Provider} from 'react-redux';
import store from './state/store';
import './state/localStorageSave';
import './ws/socket';
import Head from "./components/Head";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Head />
        <Header/>
        <Messages/>
        <AsidePanel/>
      </div>
    </Provider>
  );
};

export default App;
