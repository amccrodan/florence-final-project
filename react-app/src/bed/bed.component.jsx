import React, { Component } from 'react';

import RequestButton from './request-button.component.jsx';
import ChooseBed from './choose-bed.component.jsx'

import axios from 'axios';

class Bed extends Component {
  constructor(props){
    super(props);
    this.state = {
      beds: []
    };

    this.renderAllButtons = this.renderAllButtons.bind(this);
  }

  componentDidMount() {

    // this.ws = new WebSocket('ws://localhost:4000/');
    // This handles a new message from server
    // this.ws.onmessage = (event) => {
    // }
    this.serverRequest =
      axios ({
        method: "get",
        url: "http://localhost:8080/api/beds",
        responseType: 'json', // default
        withCredentials: false // default
      })
      .then((result) => {
        this.setState({beds: result.data})
      })
      .then(() => console.log(this.state))
  }
        // <RequestButton />
  render(){
    return (
      <div>
        <ChooseBed />
      </div>
    );
  }

  renderAllButtons(){
    let output = ''
    this.state.beds.forEach((item) => {
      return <button className="button is-large is-40-wide">item.
    })
  }
}

export default Bed