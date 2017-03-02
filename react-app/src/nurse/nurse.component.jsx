import React, { Component } from 'react';
import axios from 'axios';

import RequestQueue from './request-queue.component.jsx';
import NurseList from './nurse-list.component.jsx';
import CareAideList from './care-aid-list.component.jsx';


class Nurse extends Component {
  constructor(props){
    super(props);
    this.state = {
      stationId: "master",
      requests: [],
      nurses: [],
    };

    this.serverRequest = axios.create({
      baseURL: "http://localhost:8080/api/",
      responseType: 'json', // default
      withCredentials: false // default
    });
  }

  getRequests() {
    this.serverRequest.get("requests").then((result) => {
      this.setState({requests: result.data}, () => {
        console.log(this.state.requests);
      });
    });
  }

  componentDidMount() {
    this.getRequests();

    this.serverRequest.get("nurses").then((result) => {
      this.setState({nurses: result.data}, () => {
        console.log(this.state.nurses);
      });
    })

    this.props.route.assignWebSocketId(this.state.stationId);
  }

  render(){
    return (
      <div>
        <nav className="nav navbar">
          <div className="nav-left">
            Florence
          </div>
        </nav>
        <div className='tile is-ancestor nurse-station'>
          <RequestQueue requests={this.state.requests} />
          <div className='tile is-vertical is-parent staff-list'>
            <h1 className='title has-text-centered'>Care-aides</h1>
            <CareAideList nurses={this.state.nurses} />
            <hr className='divider'/>
            <h1 className='title has-text-centered'>Nurses</h1>
            <NurseList nurses={this.state.nurses} />
          </div>
        </div>
        </div>
    );
  }
}

export default Nurse
