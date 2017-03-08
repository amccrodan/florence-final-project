require('../styles/application.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Main from './common/main.component.jsx'
import Station from './station/station.component.jsx'
import Bed from './bed/bed.component.jsx'
import Admin from './admin/admin.component.jsx'

const webSocket = new WebSocket('ws://localhost:4000');
const assignWebSocketId = function(stationId) {
  webSocket.send(JSON.stringify({
    type: 'assignId',
    id: stationId
  }))
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Main} />
    <Route path='/nurse'
      component={Station}
      assignWebSocketId={assignWebSocketId}
      webSocket={webSocket}
    />
    <Route path='/bed'
      component={Bed}
      assignWebSocketId={assignWebSocketId}
      webSocket={webSocket}
    />
    <Route path='/admin'
      component={Admin}
      assignWebSocketId={assignWebSocketId}
      webSocket={webSocket}
    />
  </Router>,
  document.getElementById('react-root')
);
