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
        <h1 className='title has-text-centered'>Nurses</h1>
        {this.props.nurses.map(nurse => {
          if (nurse.is_nurse) {
            return <article key={nurse.id}>
              <img src={ `http://localhost:8080/images/nurses/${nurse.image}`} />
              <p> {nurse.first_name} </p>
            </article>
          }
        }
        )}
      </div>
    );
  }
}

export default NurseList