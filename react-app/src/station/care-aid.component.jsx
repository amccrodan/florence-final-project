import React, { Component } from 'react';

class CareAid extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(){
    this.props.clickOnStaff(this.props.id);
  }

  render(){
    return (
      <div className='container'>
      <article className='has-text-centered'>
        <div>
        <img onClick={this.clickHandler} className='staff-picture' src={this.props.img} />
        <p> {this.props.first_name} </p>
        </div>
      </article>
      </div>
    );
  }
}

export default CareAid
