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
      <div className='is-child tile nurse-list'>
        {this.props.nurses.map(nurse => {
          if (nurse.is_nurse) {
            return <article className='has-text-centered' key={nurse.id}>
              <img className="staff-picture" src={ `http://localhost:8080/images/nurses/${nurse.image}`} />
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