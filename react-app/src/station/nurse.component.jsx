import React, { Component } from 'react';

class Nurse extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){
    return (
      <article className='container has-text-centered'>
        <img className='staff-picture' src={this.props.img} />
        <p> {this.props.first_name} </p>
      </article>
    );
  }
}

export default Nurse
