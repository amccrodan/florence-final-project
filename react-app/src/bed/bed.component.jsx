import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import RequestButton from './request-button.component.jsx';
import ChooseBed from './choose-bed.component.jsx';
import RequestForm from './request-form.component.jsx';
import RequestPending from './request-pending.component.jsx';
import RequestAcknowledged from './request-acknowledged.component.jsx';

import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';

class Bed extends Component {
  constructor(props){
    super(props);
    this.state = {
      view: 'chooseBed',
      beds: [],
      request: {
        //bed_id, patient_id, nurse_id, status_id, request_type_id, description
      },
      loggedIn: false,
      nurseInfo: {}
    };

    this.serverRequest = axios.create({
      baseURL: 'http://localhost:8080/api/',
      withCredentials: false, // default
      headers: {'x-access-token': cookie.load('session')},
    });

    this.changeViewState = this.changeViewState.bind(this);
    this.changeRequestState = this.changeRequestState.bind(this);
    this.getPatientInfo = this.getPatientInfo.bind(this);
    this.postRequest = this.postRequest.bind(this);
    this.putRequest = this.putRequest.bind(this);
    this.getNurseInfo = this.getNurseInfo.bind(this);
    this.getRequest = this.getRequest.bind(this);
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

    this.serverRequest.get('beds').then((result) => {
      this.setState({beds: result.data}, () => {
        console.log('Beds state set.');
      });
    })

    this.props.route.webSocket.onmessage = (event) => {
      const incomingObj = JSON.parse(event.data);
      if (incomingObj.type === 'updateRequest') {
        this.setState({view: 'requestAcknowledged'});
      }
      if (incomingObj.type === 'assignId') {
        console.log(incomingObj);
      }
    }
  }

  changeViewState(stateName) {
    this.setState({view: stateName});
  }

  changeRequestState(params, callback) {
    const newRequest = this.state.request;
    for (let key in params) {
      newRequest[key] = params[key];
    }
    this.setState({request: newRequest}, () => {
      callback();
    });
  }

  getPatientInfo(callback) {
    if (!this.state.request.patient_id) {
      this.serverRequest.get(`beds/${this.state.request.bed_id}`).then((response) => {

        // No Patient assigned to bed
        if (!response.data[0]) {
          callback();
          return;
        }

        this.changeRequestState({
          patient_id: response.data[0].patient_id,
          nurse_id: response.data[0].nurse_id
        }, () => {
          callback();
        });
      });
    }
  }

  getRequest() {
    this.serverRequest.get(`requests/${this.state.request.request_id}`).then((result) => {
      this.changeRequestState({createdAt: result.data[0].created_at}, ()=>{});
    });
  }

  postRequest() {
    this.serverRequest.post('requests', this.state.request).then((response) => {
      this.changeRequestState({request_id: response.data[0]}, () => {this.getRequest()});
      this.props.route.webSocket.send(JSON.stringify({type: 'refreshRequests'}));
    });
  }

  getNurseInfo() {
    this.serverRequest.get(`requests/${this.state.request.request_id}`).then((result) => {
      this.changeRequestState({
        nurse_id: result.data[0].nurse_id
      }, () => {
        this.serverRequest.get(`nurses/${this.state.request.nurse_id}`).then((result) => {
          this.setState({nurseInfo: result.data[0]});
        });
      })
    });
  }

  putRequest() {
    this.serverRequest.put(`requests/${this.state.request.request_id}`, this.state.request)
    .then(() => {
      this.props.route.webSocket.send(JSON.stringify({type: 'refreshRequests'}));
    });
  }

  render() {
    let output = '';
    const outputProps = {
      changeViewState: this.changeViewState,
      changeRequestState: this.changeRequestState,
      postRequest: this.postRequest,
      putRequest: this.putRequest,
      requestState: this.state.request,
      getNurseInfo: this.getNurseInfo,
      nurseInfo: this.state.nurseInfo,
      getRequest: this.getRequest
    }

    switch(this.state.view) {
      case 'chooseBed':
        output = <ChooseBed
          bedList={this.state.beds}
          getPatientInfo={this.getPatientInfo}
          assignWebSocketId={this.props.route.assignWebSocketId}
          {...outputProps}
        />
        break;
      case 'requestButton':
        output = <RequestButton
          {...outputProps} />
        break;
      case 'requestForm':
        output = <RequestForm {...outputProps} />
        break;
      case 'requestPending':
        output = <RequestPending {...outputProps} />
        break;
      case 'requestAcknowledged':
        output = <RequestAcknowledged {...outputProps} />
        break;
      default:
        output = <h4>View Not Found</h4>
    }
    if (!this.state.loggedIn) {
      output = (
      <Link to="/" activeClassName="active" >
        <p className='nav-item is-white center-stage'>
          Please Login
        </p>
      </Link>
      )
    }
    return (
      <div>
      <ReactCSSTransitionGroup
        transitionName='fadeTransition'
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

export default Bed
