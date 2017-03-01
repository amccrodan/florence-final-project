import React, { Component } from 'react';

class RequestForm extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  this.handleClick = this.handleClick.bind(this);

  }

  handleClick (event) {
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
              <span className='button is-large is-primary options'><i className='fa fa-medkit' aria-hidden='true'></i></span>
            </div>
            <div className='column'>
              <span className='button is-large is-info options'><i className='fa fa-cutlery' aria-hidden='true'></i></span>
            </div>
            <div className='column'>
              <span className='button is-large options bathroom'>
                <i className='fa fa-male' aria-hidden='true'></i>
                <i className='fa fa-female' aria-hidden='true'></i>
              </span>
            </div>
            <div className='column'>
              <span className='button is-large is-warning options'><i className='fa fa-question' aria-hidden='true'></i></span>
            </div>
          </div>
          <p className='input-field'>
            <textarea className='textarea' type='text' placeholder='Add a comment...'></textarea>
            <button type='submit' className='button is-success submit' onClick={this.handleClick}>
             <h1 className='title is-1'>Submit</h1>
            </button>
          </p>
        </div>
    );
  }
}

export default RequestForm