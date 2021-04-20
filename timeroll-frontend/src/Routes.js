import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Login.js';
import Menu from './Menu.js';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/menu" component={Menu}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;