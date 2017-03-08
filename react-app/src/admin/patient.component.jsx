import React, { Component } from 'react';
class Patient extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render () {
    return (
      <tr className='admin-table-row'>
        <td className='admin-table-data'>{this.props.id}</td>
        <td className='admin-table-data'>{this.props.first_name} {this.props.last_name}</td>
        <td className='admin-table-data'>{this.props.bed}</td>
        <td className='admin-table-data'>{this.props.room}</td>
      </tr>
    );
  }
}

export default Patient;
