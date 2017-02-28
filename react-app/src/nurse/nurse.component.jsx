import React, { Component } from 'react';
import axios from 'axios';

class Nurse extends Component {
  constructor(props){
    super(props);
    this.state = {
      stationId: "master",
      requests: []
    };

    this.serverRequest = axios.create({
      baseURL: "http://localhost:8080/api/",
      responseType: 'json', // default
      withCredentials: false // default
    });
  }

  componentDidMount() {
    this.serverRequest.get("requests").then((result) => {
      this.setState({requests: result.data}, () => {
        console.log(this.state.requests);
      });
    })

    this.props.route.assignWebSocketId(this.state.stationId);
  }

  render(){
    return (
      <h1>Nurse Page</h1>
    );
  }
}

export default Nurse
