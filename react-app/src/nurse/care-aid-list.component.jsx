import React, { Component } from 'react';
import axios from 'axios';

class CareAideList extends Component {

  constructor(props){
    super(props);
    this.state = {
      careaids: []
    };
  }

  componentDidMount(){

  }

  render(){
    return (
      <div className='is-child tile care-aides-list'>
        <h1 className='title has-text-centered'>Care-aides</h1>
        {this.props.nurses.map(careaid => {
          if (!careaid.is_nurse) {
            return <article className='has-text-centered' key={careaid.id}>
            <img className="staff-picture" src={ `http://localhost:8080/images/nurses/${careaid.image}`} />
            <p> {careaid.first_name} </p>
            </article>
          }
        }
        )}
      </div>
    );
  }


}

export default CareAideList