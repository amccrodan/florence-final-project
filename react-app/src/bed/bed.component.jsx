import React, { Component } from 'react';

import RequestButton from './request-button.component.jsx';

class Bed extends Component {
  constructor(props){
    super(props);
    this.state = {
    };

    // this.newMessage = this.newMessage.bind(this);
  }

  componentDidMount() {

    // this.ws = new WebSocket('ws://localhost:4000/');

    // This handles a new message from server
    this.ws.onmessage = (event) => {

    }
  };

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