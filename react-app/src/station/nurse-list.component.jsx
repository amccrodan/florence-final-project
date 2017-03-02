import React, { Component } from 'react';
import axios from 'axios';
import ReactDragula from 'react-dragula';
import Nurse from './nurse.component.jsx';


class NurseList extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }

  // componentDidMount(){
  //   const container = React.findDOMNode(this);
  //   dragula([container]);
  // }

  render(){
    return (
      <div className='is-child tile nurse-list'>
        {this.props.nurses.map(nurse => {
          if (nurse.is_nurse) {
            return <Nurse key={nurse.id} first_name={nurse.first_name} img={nurse.image} />
          }
        }
        )}
      </div>
    );
  }
}

export default NurseList