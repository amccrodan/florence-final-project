import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class RequestButton extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  this.handleClick = this.handleClick.bind(this);
  this.emergencyRequest = this.emergencyRequest.bind(this);
  }

  handleClick (event) {
    this.props.changeViewState('requestForm');
  }

  emergencyRequest () {
    this.props.changeRequestState({request_type_id: 5}, () => {
      this.props.postRequest();
    });
    this.props.changeViewState('requestPending');
  }

  componentDidMount () {
    this.props.getPatientId();
  }

  render(){
    return (
      <section className='hero is-light is-fullheight'>
        <div className='hero nice-background is-fullheight'>
        </div>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <ReactCSSTransitionGroup
              transitionName="fadeTransition"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              <div className='button is-focused is-success choices' onClick={this.handleClick}>
                <h1 className='title is-1'>Request</h1>
              </div>
              <div className='button is-danger choices' onClick={this.emergencyRequest}>
                <i className='request-category fa fa-exclamation-triangle' aria-hidden='true'></i>
              </div>
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </section>
    );
  }
}

export default RequestButton
