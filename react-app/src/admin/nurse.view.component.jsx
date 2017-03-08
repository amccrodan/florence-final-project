import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Nurse from './nurse.component.jsx';
import axios from 'axios';
import cookie from 'react-cookie';

class NurseView extends Component {
  constructor(props){
    super(props);
    this.state = {
      nurses: []
    };

    this.serverRequest = axios.create({
      baseURL: 'http://localhost:8080/api/',
      withCredentials: false, // default
      headers: {'x-access-token': cookie.load('session')},
    });

  }

  filterNurses(nurse) {
    if (nurse.is_nurse === true){
      return nurse;
    }
  }

  getNurses(callback) {
    this.serverRequest.get('nurses').then((result) => {
      const filtered = result.data.filter(this.filterNurses);
      this.setState({nurses: filtered}, () => {
        if (callback) {
          callback();
        }
      });
    });
  }

  componentDidMount() {
    this.getNurses();
  }

  render () {
    return (
      <ReactCSSTransitionGroup
        transitionName='fadeTransition'
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <table className='table is-striped admin-table'>
          <thead className='admin-table-head'>
            <tr className='admin-table-row'>
              <th className='admin-table-header'>ID</th>
              <th className='admin-table-header'>Name</th>
            </tr>
          </thead>
          <tbody className='admin-table-body'>
          {this.state.nurses.map(nurse => {
            return <Nurse key={nurse.id}
              first_name={nurse.first_name}
              last_name={nurse.last_name}
              id={nurse.id}
              />
          }
          )}
          </tbody>
        </table>
      </ReactCSSTransitionGroup>
    );
  }
}

export default NurseView;
