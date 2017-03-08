import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class RequestForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      typeSelected: 0
    };
    this.handleTypeButton = this.handleTypeButton.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTypeButton (event) {
    let currentType = this.state.typeSelected;
    const requestTypes = ['food', 'bathroom', 'medicine', 'other'];

    requestTypes.forEach(function (item, index) {
      if (event.currentTarget.classList.contains(item)) {
        currentType = (currentType === index + 1) ? 0 : index + 1;
      }
    });

    this.setState({typeSelected: currentType});
    this.props.changeRequestState({request_type_id: currentType}, () => {});
  }

  handleCancel (event) {
    this.props.changeViewState('requestButton');
  }

  handleSubmit (event) {
    const textarea = document.getElementsByClassName('textarea')[0];
    this.props.changeRequestState({description: textarea.value}, () => {
      this.props.postRequest();
    });
    this.props.changeViewState('requestPending');
  }

  render(){
    const submitForm = (this.state.typeSelected) ? (
      <p className='input-field'>
        <textarea className='textarea' type='text' placeholder='Add a comment...'></textarea>
        <button type='submit' className='button is-success submit' onClick={this.handleSubmit}>
         <h1 className='title is-1'>Submit</h1>
        </button>
      </p>
    ) : '';

    return (
        <div className='container'>
            <ReactCSSTransitionGroup
            transitionName='fadeTransition'
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
          <section>
            <div className='hero'>
              <div className='hero-body'>
                <div className='container has-text-centered'>
                  <h1 className='title'>How can we help you today?</h1>
                </div>
                <div className='cancel'>
                  <span className='button is-large is-danger' onClick={this.handleCancel}>Cancel</span>
                </div>
              </div>
            </div>
          </section>
          <div className='columns'>
            <div className='column'>
              <div className={(this.state.typeSelected === 3) ? 'type-selected' : ''}>
                <span className='button is-large is-primary options medicine' onClick={this.handleTypeButton}>
                  <i className='request-category fa fa-medkit' aria-hidden='true'></i>
                </span>
              </div>
            </div>
            <div className='column'>
              <div className={(this.state.typeSelected === 1) ? 'type-selected' : ''}>
                <span className='button is-large is-info options food' onClick={this.handleTypeButton}>
                  <i className='request-category fa fa-cutlery' aria-hidden='true'></i>
                </span>
              </div>
            </div>
            <div className='column'>
              <div className={(this.state.typeSelected === 2) ? 'type-selected' : ''}>
                <span className='button is-large options bathroom' onClick={this.handleTypeButton}>
                  <p className='request-category-img-container'><img className='request-category-img' src='http://localhost:8080/images/toilet.png' /></p>

                </span>
              </div>
            </div>
            <div className='column'>
              <div className={(this.state.typeSelected === 4) ? 'type-selected' : ''}>
                <span className='button is-large is-warning options other' onClick={this.handleTypeButton}>
                  <i className='request-category fa fa-question' aria-hidden='true'></i>
                </span>
              </div>
            </div>
          </div>
          {submitForm}
          </ReactCSSTransitionGroup>
        </div>
    );
  }
}

export default RequestForm
