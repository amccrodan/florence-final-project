import React, { Component } from 'react';

import RequestQueue from './request-queue.component.jsx';
import NurseList from './nurse-list.component.jsx';
import CareAideList from './care-aid-list.component.jsx';
import axios from 'axios';


class Nurse extends Component {
  constructor(props){
    super(props);
    this.state = {
      this.serverRequest =
      axios ({
        method: "get",
        url: "http://localhost:8080/api/requests",
        responseType: 'json', // default
        withCredentials: false // default
      })
      .then(function(result) {
        console.log(result)
      })
    };
  }

  componentDidMount(){

  }

  render(){
    return (
      <div className='tile is-ancestor nurse-station'>
        <RequestQueue/>
        <div className='tile is-vertical is-parent'>
          <CareAideList />
          <NurseList />
        </div>
      </div>
    );
  }
}

export default Nurse