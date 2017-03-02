import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactDragula from 'react-dragula';

class DragulaComponent extends Component {

  componentDidMount(){
    var container = ReactDOM.findDOMNode(this);
    ReactDragula([container]);
  }

  render (){

    return (
      <div className='assign-staff-box'>
        <i className="fa fa-user" aria-hidden="true"></i>
      </div>
    )
  }

}

export default DragulaComponent