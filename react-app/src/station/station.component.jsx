import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import RequestQueue from './request-queue.component.jsx';
import NurseList from './nurse-list.component.jsx';
import CareAideList from './care-aid-list.component.jsx';

class Station extends Component {
  constructor(props){
    super(props);
    this.state = {
      stationId: "master",
      requests: [],
      nurses: [],
      time: '',
      staffSelected: 0,
      loggedIn: false
    };

    this.serverRequest = axios.create({
      baseURL: "http://localhost:8080/api/",
      responseType: 'json', // default
      withCredentials: false, // default
      headers: {'x-access-token': cookie.load('session')}
    });

    this.getRequests = this.getRequests.bind(this);
    this.respondToRequest = this.respondToRequest.bind(this);
    this.getCurrentTime = this.getCurrentTime.bind(this);
    this.assignStaffToRequest = this.assignStaffToRequest.bind(this);
    this.clickOnStaff = this.clickOnStaff.bind(this);
  }

  getRequests() {
    this.serverRequest.get("requests").then((result) => {
      this.setState({requests: result.data}, () => {});
    });
  }

  getCurrentTime() {
    const currentTime = moment().format("ddd, MMMM Do YYYY, HH:mm:ss a");
    this.setState({ time: currentTime });
  }

  respondToRequest(bed_id, id) {
    // send WS message that will go to specified bed_id
    console.log("Clicked respond on Bed " + bed_id +''+ id);
    this.serverRequest.put((`requests/${id}`), {status_id: 2}).then(() => {
      this.props.route.webSocket.send(JSON.stringify({type: 'updateRequest', bed_id: bed_id}));
      this.getRequests();
    });
  }

  assignStaffToRequest(request_id, nurse_id){
    this.setState( {requestAck: true});
    this.serverRequest.put((`requests/${request_id}`), {nurse_id: nurse_id}).then(() => {
      this.getRequests();
    });
  }

  clickOnStaff(nurse_id){
    console.log("The state should be updated to", nurse_id);
    this.setState({ staffSelected: nurse_id });
  }


  componentDidMount() {
    this.serverRequest
    .get('authenticate')
    .then(result => {
      console.log(result.data);
      if (result.data.success) {
        this.setState({loggedIn: true});
      }
    })

    this.getRequests();

    this.serverRequest.get("nurses").then((result) => {
      this.setState({nurses: result.data}, () => {
        // console.log(this.state.nurses);
      });
    })

    this.getCurrentTime();
    this.clockTimer = setInterval(this.getCurrentTime, 1000);

    this.props.route.assignWebSocketId(this.state.stationId);

    this.props.route.webSocket.onmessage = (event) => {
      const incomingObj = JSON.parse(event.data);
      if (incomingObj.type === 'refreshRequests') {
        this.getRequests();
      }
      if (incomingObj.type === 'assignId') {
        console.log(incomingObj);
      }
    }
  }

  componentWillUnmount () {
    clearInterval(this.clockTimer);
  }

  render(){
    let output = '';
    output = (
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
          <RequestQueue requests={this.state.requests}
            assignStaffToRequest={this.assignStaffToRequest}
            respondToRequest={this.respondToRequest}
            staffSelected={this.state.staffSelected}
            />
          <div className='tile is-vertical is-parent staff-list'>
            <h1 className='title has-text-centered'>Care-aides</h1>
            <CareAideList clickOnStaff={this.clickOnStaff} nurses={this.state.nurses} />
            <hr className='divider'/>
            <h1 className='title has-text-centered'>Nurses</h1>
            <NurseList nurses={this.state.nurses} />
          </div>
        </div>
      </div>
    )
    if (!this.state.loggedIn) {
      output = (
      <Link to="/" activeClassName="active">
        <p className='nav-item is-white center-stage'>
          Please Login
        </p>
      </Link>
      )
    }
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="fadeTransition"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {output}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Station
