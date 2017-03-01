import React, { Component } from 'react';

class RequestButton extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  this.handleClick = this.handleClick.bind(this);

  }

  handleClick (event) {
    this.props.changeViewState('requestForm');
  }

  render(){
    return (
      <section className='hero is-light is-fullheight'>
        <div className='hero nice-background is-fullheight'>
        </div>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <div className='button is-focused is-success choices' onClick={this.handleClick}>
              <h1 className='title is-1'>Request</h1>
            </div>
            <div className='button is-danger choices'>
              <i className='request-category fa fa-exclamation-triangle' aria-hidden='true'></i>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default RequestButton