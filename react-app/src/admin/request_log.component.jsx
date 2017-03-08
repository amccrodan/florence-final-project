import React, { Component } from 'react';
class RequestLog extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render () {
    return (
      <tr className='admin-table-row'>
        <td className='admin-table-data'>{this.props.id}</td>
        <td className='admin-table-data'>{this.props.patient_first_name} {this.props.patient_last_name}</td>
        <td className='admin-table-data'>{this.props.nurse_first_name} {this.props.nurse_last_name}</td>
        <td className='admin-table-data'>{this.props.bed_id}</td>
        <td className='admin-table-data'>{this.props.room_num}</td>
        <td className='admin-table-data'>{this.props.request_type_id}</td>
        <td className='admin-table-data'>{this.props.created_at}</td>
        <td className='admin-table-data'>{this.props.updated_at}</td>
        <td className='admin-table-data'>{this.props.description}</td>
        <td className='admin-table-data'>{this.props.nurse_log}</td>
        <td className='admin-table-data'>{this.props.status_id}</td>
      </tr>
    );
  }
}

export default RequestLog;
