import React, { Component } from 'react';

import RequestButton from './request-button.component.jsx';
import RequestForm from './request-form.component.jsx';
import RequestPending from './request-pending.compenent.jsx';
import RequestAcknowledged from './request-acknowledged.component.jsx';

import axios from 'axios';


class Bed extends Component {
  constructor(props){
    super(props);
    this.state = {
      bedId: 3,
      beds: [] // test data
    };

    this.serverRequest = axios.create({
      baseURL: "http://localhost:8080/api/",
      responseType: 'json', // default
      withCredentials: false // default
    });
  }

  componentDidMount() {
    // Put the below in the main request screen component
    // this.props.route.assignWebSocketId(this.state.bedId);

    this.serverRequest.get("beds").then((result) => {
      this.setState({beds: result.data}, () => {
        console.log(`State: ${this.state.beds}`);
      });
    })
  }

  render(){
   
   return (
      <div>
        <h1>Request pending</h1>
        <RequestPending />
      </div>
    );

    return (
      <div>
        <h1>Request acknowledged</h1>
        <RequestAcknowledged />
      </div>
    );
   
    return (
      <div>
        <h1>Request form</h1>
        <RequestForm />
      </div>
    );

    return (
      <div>
        <h1>Bed Page</h1>
        <RequestButton />
      </div>
    );
  }
}

export default Bed
