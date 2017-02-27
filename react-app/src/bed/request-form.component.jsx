import React, { Component } from 'react';

class RequestForm extends Component {
  render(){
    return (
        <div className='container'>
            <header>
                <div className='hero'>
                    <div className='hero-body'>
                        <div className='container has-text-centered'>
                            <h1 className='title'>How can we help you today?</h1>
                        </div>
                    </div>
                </div>
            </header>
            <div className='columns'>
                <div className='column'>
                    <span className='button is-large is-primary options'><i className='fa fa-medkit' aria-hidden='true'></i></span> 
                </div>
                <div className='column'>
                    <span className='button is-large is-info options'><i className='fa fa-cutlery' aria-hidden='true'></i></span> 
                </div>
                <div className='column'>
                    <span className='button is-large is-success options'>
                        <i className='fa fa-male' aria-hidden='true'></i>
                        <i className='fa fa-female' aria-hidden='true'></i>
                    </span>
                </div>
                <div className='column'>
                    <span className='button is-large is-warning options'><i className='fa fa-question' aria-hidden='true'></i></span>
                </div>
            </div>
            <p className='control'>
                <textarea className='textarea' type='text' placeholder='Add a comment...'></textarea>
                <button type='submit' className='button is-primary submit'>
                    <h1 className='title is-1'>Submit</h1>
                </button>
            </p>
        </div>
    );
  }
}

export default RequestForm