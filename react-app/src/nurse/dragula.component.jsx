import React, { Component } from 'react';
import ReactDragula from 'react-dragula';

class DragulaComponent extends Component {

  componentDidMount(){
    const container = React.findDOMNode(this);
    dragula([container]);
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