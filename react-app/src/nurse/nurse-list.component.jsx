import React, { Component } from 'react';
import axios from 'axios';


class NurseList extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentDidMount(){

  }

  render(){
    return (
      <div className='is-child tile'>
        <h1>Nurses</h1>
        {this.props.nurses.map(nurse => {
          if (nurse.is_nurse) {
            return <article key={nurse.id} > {nurse.first_name} </article>
          }
        }
        )}
      </div>
    );
  }
}

export default NurseList