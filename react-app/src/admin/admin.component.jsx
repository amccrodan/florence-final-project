import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import activeComponent from 'react-router-active-component'

class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {
      view: 'adminDashboard',
      request: {
        //bed_id, patient_id, nurse_id, status_id, request_type_id, description
      },
      loggedIn: false
    };

    this.serverRequest = axios.create({
      baseURL: 'http://localhost:8080/api/',
      withCredentials: false, // default
      headers: {'x-access-token': cookie.load('session')},
    });

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

  render() {
    let nav = (
      <aside className="menu menu-spacing">
        <p className="menu-label">
          Admin Dashboard
        </p>
        <ul className="menu-list">
          <li>
            <a className="is-active">Manage Patients</a>
            <ul>
              <li><a>View/Assign Patients</a></li>
              <li><a>Add Bed</a></li>
              <li><a>Add Patient</a></li>
            </ul>
          </li>
          <li>
            <a className="">Manage Nurses</a>
            <ul>
              <li><a>View/Assign Nurses</a></li>
              <li><a>Add a Nurse</a></li>
            </ul>
          </li>
          <li>
            <a className="">Manage Care Aides</a>
            <ul>
              <li><a>View Care Aides</a></li>
              <li><a>Add a Care Aide</a></li>
            </ul>
          </li>
          <li><a>Scheduling</a></li>
          <li><a>Charts</a></li>
        </ul>
      </aside>
    )

    return (
      <div>
      <ReactCSSTransitionGroup
        transitionName='fadeTransition'
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div className='columns'>
          <div className='column is-one-quarter'>
            {nav}
          </div>
          <div className='column '>
          </div>
        </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}

export default Admin
