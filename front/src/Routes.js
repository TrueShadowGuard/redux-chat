import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import {useSelector} from "react-redux";

const Routes = () => {

  const token = useSelector(state => state.token);

  console.log('render routes', token)

  return (
    <Switch>
      <Route path="/auth" component={AuthPage}/>
      {token ? <Route  path="/" component={ChatPage} /> : <Redirect to="/auth" /> }
    </Switch>
  );
};

export default Routes;
