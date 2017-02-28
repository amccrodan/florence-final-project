import React, { Component } from 'react';

import RequestButton from './request-button.component.jsx';
import ChooseBed from './choose-bed.component.jsx'
import RequestForm from './request-form.component.jsx';

import axios from 'axios';


class Bed extends Component {
  constructor(props){
    super(props);
    this.state = {
      view: 'chooseBed',
      beds: []
    };

    this.serverRequest = axios.create({
      baseURL: "http://localhost:8080/api/",
      responseType: 'json', // default
      withCredentials: false // default
    });
  }

  componentDidMount() {
    // Put the below in the main request screen component

    this.serverRequest.get("beds").then((result) => {
      this.setState({beds: result.data}, () => {
        console.log(`State: ${this.state.beds}`);
      });
    })
  }

  render(){
    let output = '';
    if (this.state.view === 'chooseBed') {
      output = <ChooseBed
      bedList={this.state.beds}
      assignWebSocketId={this.props.route.assignWebSocketId} />
    }
    if (this.state.view === 'requestButton') {
      output = <RequestButton />
    }
    if (this.state.view === 'requestForm') {
      output = <RequestForm />
    }
    return (
      <div>
        {output}
      </div>
    );

  }


}

export default Bed
