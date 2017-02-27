import React, { Component } from 'react';

class RequestForm extends Component {
  render(){
    return (
        <div className='container'>
            <header>
                <div className='hero'>
                    <p>How can we help you today?</p>
                </div>
            </header>
            <div className='columns'>
                <div className='column'>
                    <span className='button is-large is-primary'><i className="fa fa-medkit" aria-hidden="true"></i></span> 
                </div>
                <div className='column'>
                    <span className='button is-large is-info'><i className="fa fa-cutlery" aria-hidden="true"></i></span> 
                </div>
                <div className='column'>
                    <span className='button is-large is-success'>
                        <i className="fa fa-male" aria-hidden="true"></i>
                        <i className="fa fa-female" aria-hidden="true"></i>
                    </span>
                </div>
                <div className='column'>
                    <span className='button is-large is-warning'><i className="fa fa-question" aria-hidden="true"></i></span>
                </div>
            </div>
            <textarea class="textarea" placeholder="Add a comment..."></textarea>
            <button type='submit' className="button is-primary">Submit</button>
        </div>
    );
  }
}

export default RequestForm