import React, { Component } from 'react';

import RequestButton from './request-button.component.jsx';
import ChooseBed from './choose-bed.component.jsx'
import RequestForm from './request-form.component.jsx';
import RequestPending from './request-pending.component.jsx';
import RequestAcknowledged from './request-acknowledged.component.jsx';

import axios from 'axios';


class Bed extends Component {
  constructor(props){
    super(props);
    this.state = {
      view: 'chooseBed',
      beds: [],
      request: {
        //bed_id, patient_id, nurse_id, status_id, request_type_id, description
      }
    };

    this.serverRequest = axios.create({
      baseURL: 'http://localhost:8080/api/',
      withCredentials: false, // default
    });

    this.changeViewState = this.changeViewState.bind(this);
    this.changeRequestState = this.changeRequestState.bind(this);
    this.getPatientInfo = this.getPatientInfo.bind(this);
    this.postRequest = this.postRequest.bind(this);
    this.putRequest = this.putRequest.bind(this);
  }

  componentDidMount() {
    // Put the below in the main request screen component

    this.serverRequest.get('beds').then((result) => {
      this.setState({beds: result.data}, () => {
        console.log('Beds state set.');
      });
    })
  }

  changeViewState (stateName) {
    this.setState({view: stateName});
  }

  changeRequestState (params, callback) {
    const newRequest = this.state.request;
    for (let key in params) {
      newRequest[key] = params[key];
    }
    this.setState({request: newRequest}, () => {
      callback();
      console.log('Local request:');
      console.log(this.state.request);
    });
  }

  getPatientInfo () {
    if (!this.state.request.patient_id) {
      this.serverRequest.get(`beds/${this.state.request.bed_id}`).then((response) => {
        this.changeRequestState({
          patient_id: response.data[0].patient_id,
          nurse_id: response.data[0].nurse_id
        }, () => {});
      });
    }
  }

  postRequest () {
    this.serverRequest.post('requests', this.state.request).then((response) => {
      console.log('Posted:');
      console.log(this.state.request);
      this.changeRequestState({request_id: response.data[0]}, () => {});
      this.props.route.webSocket.send(JSON.stringify({type: 'refreshRequests'}));
    });
  }

  putRequest () {
    this.serverRequest.put(`requests/${this.state.request.bed_id}`, this.state.request)
    .then(() => {
      console.log('Put:');
      console.log(this.state.request);
      this.props.route.webSocket.send(JSON.stringify({type: 'refreshRequests'}));
    });
  }

  render(){
    let output = '';
    const outputProps = {
      changeViewState: this.changeViewState,
      changeRequestState: this.changeRequestState,
      postRequest: this.postRequest,
      putRequest: this.putRequest
    }

    switch(this.state.view) {
      case 'chooseBed':
        output = <ChooseBed
          bedList={this.state.beds}
          assignWebSocketId={this.props.route.assignWebSocketId}
          {...outputProps}
        />
        break;
      case 'requestButton':
        output = <RequestButton
          getPatientInfo={this.getPatientInfo}
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

    return (
      <div>
        {output}
      </div>
    );
  }

}

export default Bed
