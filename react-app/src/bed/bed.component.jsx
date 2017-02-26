import React, { Component } from 'react';

import RequestButton from './request-button.component.jsx';

class Bed extends Component {
  render(){
    return (
      <div>
        <h1>Bed Page</h1>
        <RequestButton />
      </div>
    );
  }
}

export default Bed