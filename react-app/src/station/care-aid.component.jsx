import React, { Component } from 'react';

class CareAid extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){
    return (
      <div className='container'>
      <article className='has-text-centered'>
        <div>
        <img className="staff-picture" src={ `http://localhost:8080/images/nurses/${this.props.img}`} />
        <p> {this.props.first_name} </p>
        </div>
      </article>
      </div>
    );
  }
}

export default CareAid