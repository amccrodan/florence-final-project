// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Main from './common/main.component.jsx'

import Nurse from './nurse/nurse.component.jsx'
import Bed from './bed/bed.component.jsx'

const webSocket = new WebSocket("ws://localhost:4000");

webSocket.onmessage = (event) => {
  const incomingObj = JSON.parse(event.data);
  console.log(incomingObj);
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main} />
    <Route path="/nurse" component={Nurse} />
    <Route path="/bed" component={Bed}/>
  </Router>,
  document.getElementById('react-root')
);
