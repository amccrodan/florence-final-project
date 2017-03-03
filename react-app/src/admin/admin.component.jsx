import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import axios from 'axios';
import { Link } from 'react-router';
import cookie from 'react-cookie';

class Bed extends Component {
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
      <aside className="menu">
        <p className="menu-label">
          General
        </p>
        <ul className="menu-list">
          <li><a>Dashboard</a></li>
          <li><a>Customers</a></li>
        </ul>
        <p className="menu-label">
          Administration
        </p>
        <ul className="menu-list">
          <li><a>Team Settings</a></li>
          <li>
            <a className="is-active">Manage Your Team</a>
            <ul>
              <li><a>Members</a></li>
              <li><a>Plugins</a></li>
              <li><a>Add a member</a></li>
            </ul>
          </li>
          <li><a>Invitations</a></li>
          <li><a>Cloud Storage Environment Settings</a></li>
          <li><a>Authentication</a></li>
        </ul>
        <p className="menu-label">
          Transactions
        </p>
        <ul className="menu-list">
          <li><a>Payments</a></li>
          <li><a>Transfers</a></li>
          <li><a>Balance</a></li>
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
        </ReactCSSTransitionGroup>
        <div className='columns'>
          <div className='column is-one-quarter'>
            {nav}
          </div>
          <div className='column '>
          </div>
          <div className='column'>
          </div>
        </div>
      </div>
    );
  }

}

export default Bed
