import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactDragula from 'react-dragula';

class AssignStaffBox extends Component {

  render (){

    return (
      <div className='container'>
        <div className='assign-staff-box'>
          <i className="fa fa-user" aria-hidden="true"></i>
        </div>
      </div>
    )
  }

}

export default AssignStaffBox