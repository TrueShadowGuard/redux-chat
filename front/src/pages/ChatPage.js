import Head from "../components/Head";
import Header from "../components/Header";
import Messages from "../components/Messages";
import AsidePanel from "../components/AsidePanel";
import React from "react";

const ChatPage = () => {
  return (
    <div className="app">
      <Head/>
      <Header/>
      <Messages/>
      <AsidePanel/>
    </div>
  );
};

export default ChatPage;
