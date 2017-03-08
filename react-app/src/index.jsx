require('../styles/application.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Main from './common/main.component.jsx'
import Station from './station/station.component.jsx'
import Bed from './bed/bed.component.jsx'
import Admin from './admin/admin.component.jsx'

const hostName = 'localhost';

const webSocket = new WebSocket(`ws://${hostName}:4000`);
const assignWebSocketId = function(stationId) {
  webSocket.send(JSON.stringify({
    type: 'assignId',
    id: stationId
  }))
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/'
      component={Main}
      hostName={hostName}
    />
    <Route path='/nurse'
      component={Station}
      assignWebSocketId={assignWebSocketId}
      webSocket={webSocket}
      hostName={hostName}
    />
    <Route path='/bed'
      component={Bed}
      assignWebSocketId={assignWebSocketId}
      webSocket={webSocket}
      hostName={hostName}
    />
    <Route path='/admin'
      component={Admin}
      assignWebSocketId={assignWebSocketId}
      webSocket={webSocket}
      hostName={hostName}
    />
  </Router>,
  document.getElementById('react-root')
);
