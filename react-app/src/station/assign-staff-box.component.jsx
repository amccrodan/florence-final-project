import React, { Component } from 'react';

class AssignStaffBox extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
    this.assignStaff = this.assignStaff.bind(this);
  }

   assignStaff (event) {
    event.stopPropagation();
    this.props.changeRequestAck();
    this.props.assignStaffToRequest(this.props.id, this.props.staffSelected);
  }

  render (){

    return (
      <div className='container'>
        <div className='assign-staff-box' onClick={this.assignStaff}>
          <i className='fa fa-user' aria-hidden='true'></i>
        </div>
      </div>
    );
  }

}

export default AssignStaffBox
