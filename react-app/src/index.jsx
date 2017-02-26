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


// ReactDOM.render(
//   <App />,
//   document.getElementById('react-root')
// );

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main} />
    <Route path="/nurse" component={Nurse} />
    <Route path="/bed" component={Bed}/>
  </Router>,
  document.getElementById('react-root')
);