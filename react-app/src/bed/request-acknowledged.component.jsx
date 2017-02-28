import React, { Component } from 'react';

class RequestAcknowledged extends Component {
  render(){
    return (
      <section className='hero is-light is-fullheight'>
        <div className='hero nice-background is-fullheight'>
        </div>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <div className='columns'>
              <div className='column is-one-third'>
              </div>
              <div className='column'>
                  <img className='is-focused big-circle' src='http://www.fillmurray.com/300/200'/>  
              </div>
              <div className='column'>
              </div>
            </div>
          </div>
        </div>
        <div className='container has-text-centered'>
          <h1 className='title'>Insert nurses' name here is coming to help you </h1>
        </div>
      </section>
    );
  }
}

export default RequestAcknowledged