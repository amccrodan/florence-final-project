import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RequestLog from './request_log.component.jsx';
import axios from 'axios';
import cookie from 'react-cookie';

class RequestLogView extends Component {
  constructor(props){
    super(props);
    this.state = {
      requests: []
    };

    this.serverRequest = axios.create({
      baseURL: `http://${this.props.hostName}:8080/api/`,
      withCredentials: false, // default
      headers: {'x-access-token': cookie.load('session')},
    });
  }

  filterRequests(request) {
    if (request.status_id === 3 || request.status_id === 4){
      return request;
    }
  }

  getRequests(callback) {
    this.serverRequest.get('requests').then((result) => {
      const filtered = result.data.filter(this.filterRequests);
      this.setState({requests: filtered}, () => {
        if (callback) {
          callback();
        }
      });
    });
  }

  componentDidMount() {
    this.getRequests();
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
              <th className='request-header small-header'>ID</th>
              <th className='request-header'>Patient</th>
              <th className='request-header'>Nurse</th>
              <th className='request-header small-header'>Bed</th>
              <th className='request-header small-header'>Room</th>
              <th className='request-header'>Request Type</th>
              <th className='request-header'>Created</th>
              <th className='request-header'>Finished</th>
              <th className='request-header large-header'>Request Description</th>
              <th className='request-header large-header'>Nurse's Notes</th>
              <th className='request-header'>Status</th>
            </tr>
          </thead>
          <tbody className='admin-table-body'>
          {this.state.requests.map(request => {
            return <RequestLog key={request.request_id}
              id={request.request_id}
              patient_first_name={request.first_name}
              patient_last_name={request.last_name}
              nurse_first_name={request.nurse_first_name}
              nurse_last_name={request.nurse_last_name}
              bed_id={request.bed_id}
              room_num={request.room_id}
              request_type_id={request.request_type_id}
              created_at={request.created_at}
              updated_at={request.updated_at}
              description={request.description}
              nurse_log={request.nurse_log}
              status_id={request.status_id}
              />
          }
          )}
          </tbody>
        </table>
      </ReactCSSTransitionGroup>
    );
  }
}

export default RequestLogView;
