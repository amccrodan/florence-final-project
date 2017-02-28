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
      beds: []
    };

    this.serverRequest = axios.create({
      baseURL: "http://localhost:8080/api/",
      responseType: 'json', // default
      withCredentials: false // default
    });

    this.changeViewState = this.changeViewState.bind(this);
  }

  componentDidMount() {
    // Put the below in the main request screen component

    this.serverRequest.get("beds").then((result) => {
      this.setState({beds: result.data}, () => {
        console.log(`State: ${this.state.beds}`);
      });
    })
  }

  changeViewState (stateName) {
    this.setState({view: stateName});
  }

  render(){
    let output = '';
    const outputProps = {
      changeViewState: this.changeViewState
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
        output = <RequestButton {...outputProps} />
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
