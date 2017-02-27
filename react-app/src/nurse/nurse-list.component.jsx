import React, { Component } from 'react';
import axios from 'axios';


class NurseList extends Component {

  componentDidMount(){

    this.serverRequest =
      axios ({
        method: "get",
        url: "http://localhost:8080/api/nurses",
        responseType: 'json', // default
        withCredentials: false // default
      })
      .then(function(result) {
        console.log(result)
      })
  }
  render(){
    return (
      <div className='is-child tile'>
        <h1>Nurses</h1>
      </div>
    );
  }
}

export default NurseList