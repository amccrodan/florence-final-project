import React, { Component } from 'react';

import RequestButton from './request-button.component.jsx';
import ChooseBed from './choose-bed.component.jsx'

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
