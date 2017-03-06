import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';

import CareAideNewForm from './careAide.new.form.component.jsx';
import CareAideView from './careAide.view.component.jsx';
import NurseNewForm from './nurse.new.form.component.jsx';
import NurseView from './nurse.view.component.jsx';
import PatientBedForm from './patient.bed.form.component.jsx';
import PatientNewForm from './patient.new.form.component.jsx';
import PatientView from './patient.view.component.jsx';
import Scheduling from './scheduling.component.jsx';
import Charts from './charts.component.jsx';

class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeView: 0,
      loggedIn: false,
      views: [
        <PatientView />,
        <PatientBedForm />,
        <PatientNewForm />,
        <NurseView />,
        <NurseNewForm />,
        <CareAideView />,
        <CareAideNewForm />,
        <Scheduling />,
        <Charts />
      ]
    };

    this.serverRequest = axios.create({
      baseURL: 'http://localhost:8080/api/',
      withCredentials: false, // default
      headers: {'x-access-token': cookie.load('session')},
    });

    this.handleActiveClick = this.handleActiveClick.bind(this);
  }

  componentDidMount() {
    this.serverRequest
    .get('authenticate')
    .then(result => {
      console.log(result.data);
      if (result.data.success) {
        this.setState({loggedIn: true, activeView: 0});
      }
    })
  }

  handleActiveClick (menuItem) {
    this.setState({activeView: menuItem})
  }

  render() {
    const active = this.state.activeView;
    let nav = (
      <aside className='menu menu-spacing'>
        <p className='menu-label'>
          Admin Dashboard
        </p>
        <ul className='menu-list'>
          <li>
            <p>Manage Patients</p>
            <ul>
              <li><a className={(active === 0) ? 'is-active' : ''} onClick={() => this.handleActiveClick(0)}>View/Assign Patients</a></li>
              <li><a className={(active === 1) ? 'is-active' : ''} onClick={() => this.handleActiveClick(1)}>Add Bed</a></li>
              <li><a className={(active === 2) ? 'is-active' : ''} onClick={() => this.handleActiveClick(2)}>Add Patient</a></li>
            </ul>
          </li>
          <li>
            <p>Manage Nurses</p>
            <ul>
              <li><a className={(active === 3) ? 'is-active' : ''} onClick={() => this.handleActiveClick(3)}>View/Assign Nurses</a></li>
              <li><a className={(active === 4) ? 'is-active' : ''} onClick={() => this.handleActiveClick(4)}>Add a Nurse</a></li>
            </ul>
          </li>
          <li>
            <p>Manage Care Aides</p>
            <ul>
              <li><a className={(active === 5) ? 'is-active' : ''} onClick={() => this.handleActiveClick(5)}>View Care Aides</a></li>
              <li><a className={(active === 6) ? 'is-active' : ''} onClick={() => this.handleActiveClick(6)}>Add a Care Aide</a></li>
            </ul>
          </li>
          <li>
            <a className={(active === 7) ? 'is-active' : ''} onClick={() => this.handleActiveClick(7)}>Scheduling</a>
          </li>
          <li>
            <a className={(active === 8) ? 'is-active' : ''} onClick={() => this.handleActiveClick(8)}>Charts</a>
          </li>
        </ul>
      </aside>
    )

    let component = '';

    if (!this.state.loggedIn) {
      component = (
      <Link to="/" activeClassName="active" >
        <p className='nav-item is-white center-stage'>
          Please Login
        </p>
      </Link>
      )
      nav = '';
    } else {
      component = this.state.views[this.state.activeView];
    }

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
            {component}
          </div>
        </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}

export default Admin
