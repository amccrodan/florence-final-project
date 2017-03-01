import React, { Component } from 'react';
require("../../js/request.js");

class RequestForm extends Component {
  constructor(props){
    super(props);
      this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypeButton = this.handleTypeButton.bind(this);
  }

  handleTypeButton (event) {
    let currentType = 0;
    const requestTypes = ['food', 'bathroom', 'medicine', 'other'];
    requestTypes.forEach(function (item, index) {
      if (event.currentTarget.classList.contains(item)) {
        currentType = index + 1;
      }
    });
    this.props.changeRequestState({request_type_id: currentType}, () => {});
  }

  handleSubmit (event) {
    const textarea = document.getElementsByClassName('textarea')[0];
    this.props.changeRequestState({description: textarea.value}, () => {
      this.props.postRequest();
    });
    this.props.changeViewState('requestPending');
  }

  render(){
    return (
        <div className='container'>
          <section>
            <div className='hero'>
              <div className='hero-body'>
                <div className='container has-text-centered'>
                  <h1 className='title'>How can we help you today?</h1>
                    </div>
                <div className='cancel'>
                  <span className='button is-large is-danger'>Cancel</span>
                </div>
              </div>
            </div>
          </section>
          <div className='columns'>
            <div className='column'>
              <span className='button is-large is-primary options medicine' onClick={this.handleTypeButton}>
                <i className='fa fa-medkit' aria-hidden='true'></i>
              </span>
            </div>
            <div className='column'>
              <span className='button is-large is-info options food' onClick={this.handleTypeButton}>
                <i className='fa fa-cutlery' aria-hidden='true'></i>
              </span>
            </div>
            <div className='column'>
              <span className='button is-large options bathroom' onClick={this.handleTypeButton}>
                <i className='fa fa-male' aria-hidden='true'></i>
                <i className='fa fa-female' aria-hidden='true'></i>
              </span>
            </div>
            <div className='column'>
              <span className='button is-large is-warning options other' onClick={this.handleTypeButton}>
                <i className='fa fa-question' aria-hidden='true'></i>
              </span>
            </div>
          </div>
          <p className='input-field'>
            <textarea className='textarea' type='text' placeholder='Add a comment...'></textarea>
            <button type='submit' className='button is-success submit' onClick={this.handleSubmit}>
             <h1 className='title is-1'>Submit</h1>
            </button>
          </p>
        </div>
    );
  }
}

export default RequestForm
