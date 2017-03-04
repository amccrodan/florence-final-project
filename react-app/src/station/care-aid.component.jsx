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
    const isSelected = (this.props.id === this.props.staffSelected) ? 'staff-selected' : '';
    return (
      <div className='container'>
      <article className='has-text-centered'>
        <div>
        <img onClick={this.clickHandler} className={`staff-picture ${isSelected}`} src={ `http://localhost:8080/images/nurses/${this.props.img}`} />
        <p> {this.props.first_name} </p>
        </div>
      </article>
      </div>
    );
  }
}

export default CareAid
