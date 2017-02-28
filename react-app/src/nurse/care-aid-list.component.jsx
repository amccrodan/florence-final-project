import React, { Component } from 'react';
import axios from 'axios';

class CareAidList extends Component {

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
      <div className='is-child tile'>
        <h1 className='title has-text-centered'>Care-aids</h1>
        {this.props.nurses.map(careaid => {
          if (!careaid.is_nurse) {
            return <article key={careaid.id}>
            <img src={ `http://localhost:8080/images/nurses/${careaid.image}`} />
            <p> {careaid.first_name} </p>
            </article>
          }
        }
        )}
      </div>
    );
  }


}

export default CareAidList