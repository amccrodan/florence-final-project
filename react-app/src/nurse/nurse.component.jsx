import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

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
      time: '',
    };
    console.log(this.props.route.loggedIn);

    this.serverRequest = axios.create({
      baseURL: "http://localhost:8080/api/",
      responseType: 'json', // default
      withCredentials: false // default
    });

    this.getRequests = this.getRequests.bind(this);
    this.respondToRequest = this.respondToRequest.bind(this);
    this.getCurrentTime = this.getCurrentTime.bind(this);
  }

  getRequests() {
    this.serverRequest.get("requests").then((result) => {
      this.setState({requests: result.data}, () => {
        // console.log(this.state.requests);
      });
    });
  }

  getCurrentTime (){
    const currentTime = moment().format("ddd, MMMM Do YYYY, HH:mm:ss a");
    this.setState({ time: currentTime })
  }

  respondToRequest(bed_id) {
    // send WS message that will go to specified bed_id
    console.log("Clicked respond on Bed " + bed_id);
  }

  componentDidMount() {
    this.getRequests();

    this.serverRequest.get("nurses").then((result) => {
      this.setState({nurses: result.data}, () => {
        // console.log(this.state.nurses);
      });
    })

    setInterval(this.getCurrentTime, 1000);

    this.props.route.assignWebSocketId(this.state.stationId);

    this.props.route.webSocket.onmessage = (event) => {
      const incomingObj = JSON.parse(event.data);
      if (incomingObj.type === "refreshRequests") {
        this.getRequests();
      }
    }
  }

  render(){
    // if (!this.props.route.loggedIn.loggedIn) {
    //   output = (
    //   <Link to="/" activeClassName="active">
    //     <p className='nav-item is-white center-stage'>
    //       Please Login
    //     </p>
    //   </Link>
    //   )
    // }
    return (
      <div>
        <nav className='nav navbar level'>
          <div className='level-left'>
            <div className='nav-item'> Florence </div>
          </div>
          <div className='level-right'>
            <div className='nav-item'>
              {this.state.time}
            </div>
          </div>
        </nav>
        <div className='tile is-ancestor nurse-station'>
          <RequestQueue requests={this.state.requests} respondToRequest={this.respondToRequest}/>
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
