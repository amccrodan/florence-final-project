import React, { Component } from 'react';

class RequestButton extends Component {
  render(){
    return (
      <section className='hero is-light is-fullheight'>
        <div className='hero nice-background is-fullheight'>
        </div>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <div className='button is-focused is-success choices'>
                <h1 className='title is-1'>Request</h1>
            </div>
            <div className='button is-danger choices'>
                <i className='fa fa-exclamation-triangle' aria-hidden='true'></i>
            </div>
          </div> 
        </div>
      </section>
    );
  }
}

export default RequestButton