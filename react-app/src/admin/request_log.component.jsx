import React, { Component } from 'react';
import moment from 'moment';

class RequestLog extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  getFormattedTime(time) {
    const formated = moment(time).format('DD/MM/YY HH:mm');
    return formated;
  }

  getStatus(id) {
    if (id === 3){return 'Completed'}
    if (id === 4){return 'Cancelled'}
  }

  getRequestType(id){
    if (id === 1){return 'Food'}
    if (id === 2){return 'Bathroom'}
    if (id === 3){return 'Medicine'}
    if (id === 4){return 'Other'}
    if (id === 5){return 'Emergency'}
  }

  render () {
    return (
      <tr className='admin-table-row'>
        <td className='request-data small-header'>{this.props.id}</td>
        <td className='request-data'>{this.props.patient_first_name} {this.props.patient_last_name}</td>
        <td className='request-data'>{this.props.nurse_first_name} {this.props.nurse_last_name}</td>
        <td className='request-data small-header'>{this.props.bed_id}</td>
        <td className='request-data small-header'>{this.props.room_num}</td>
        <td className='request-data'>{this.getRequestType(this.props.request_type_id)}</td>
        <td className='request-data'>{this.getFormattedTime(this.props.created_at)}</td>
        <td className='request-data'>{this.getFormattedTime(this.props.updated_at)}</td>
        <td className='request-data large-header'>{this.props.description}</td>
        <td className='request-data large-header'>{this.props.nurse_log}</td>
        <td className='request-data'>{this.getStatus(this.props.status_id)}</td>
      </tr>
    );
  }
}

export default RequestLog;
