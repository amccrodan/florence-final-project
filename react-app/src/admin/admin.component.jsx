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
      view: 'adminDashboard',
      request: {
        //bed_id, patient_id, nurse_id, status_id, request_type_id, description
      },
      loggedIn: false,
      patientView: false,
      patientBedForm: false,
      patientNewForm: false,
      nurseView: false,
      nurseNewForm: false,
      careAideView: false,
      careAideNewForm: false,
      manageScheduling: false,
      manageCharts: false,
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
        this.setState({loggedIn: true});
      }
    })

  }

  handleActiveClick (menuItem) {

    this.state.patientView = false;
    this.state.patientBedForm = false;
    this.state.patientNewForm = false;

    this.state.nurseView = false;
    this.state.nurseNewForm = false;

    this.state.careAideView = false;
    this.state.careAideNewForm = false;

    this.state.manageScheduling = false;
    this.state.manageCharts = false;

    this.setState({[menuItem]: 'is-active'})
  }

  render() {
    let nav = (
      <aside className='menu menu-spacing'>
        <p className='menu-label'>
          Admin Dashboard
        </p>
        <ul className='menu-list'>
          <li>
            <p>Manage Patients</p>
            <ul>
              <li><a className={this.state.patientView} onClick={this.handleActiveClick.bind(this, 'patientView')}>View/Assign Patients</a></li>
              <li><a className={this.state.patientBedForm} onClick={this.handleActiveClick.bind(this, 'patientBedForm')}>Add Bed</a></li>
              <li><a className={this.state.patientNewForm} onClick={this.handleActiveClick.bind(this, 'patientNewForm')}>Add Patient</a></li>
            </ul>
          </li>
          <li>
            <p>Manage Nurses</p>
            <ul>
              <li><a className={this.state.nurseView} onClick={this.handleActiveClick.bind(this, 'nurseView')}>View/Assign Nurses</a></li>
              <li><a className={this.state.nurseNewForm} onClick={this.handleActiveClick.bind(this, 'nurseNewForm')}>Add a Nurse</a></li>
            </ul>
          </li>
          <li>
            <p>Manage Care Aides</p>
            <ul>
              <li><a className={this.state.careAideView} onClick={this.handleActiveClick.bind(this, 'careAideView')}>View Care Aides</a></li>
              <li><a className={this.state.careAideNewForm} onClick={this.handleActiveClick.bind(this, 'careAideNewForm')}>Add a Care Aide</a></li>
            </ul>
          </li>
          <li>
            <a className={this.state.manageScheduling} onClick={this.handleActiveClick.bind(this, 'manageScheduling')}>Scheduling</a>
          </li>
          <li>
            <a className={this.state.manageCharts} onClick={this.handleActiveClick.bind(this, 'manageCharts')}>Charts</a>
          </li>
        </ul>
      </aside>
    )

    let component = '';
    if (this.state.patientView === 'is-active') {
      component = <PatientView />
    }
    if (this.state.patientBedForm === 'is-active') {
      component = <PatientBedForm />
    }
    if (this.state.patientNewForm === 'is-active') {
      component = <PatientNewForm />
    }
    if (this.state.nurseView === 'is-active') {
      component = <NurseView />
    }
    if (this.state.nurseNewForm === 'is-active') {
      component = <NurseNewForm />
    }
    if (this.state.careAideView === 'is-active') {
      component = <CareAideView />
    }
    if (this.state.careAideNewForm === 'is-active') {
      component = <CareAideNewForm />
    }
    if (this.state.manageScheduling === 'is-active') {
      component = <Scheduling />
    }
    if (this.state.manageCharts === 'is-active') {
      component = <Charts />
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
