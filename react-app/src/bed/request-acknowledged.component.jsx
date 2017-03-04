import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class RequestAcknowledged extends Component {
  constructor(props){
    super(props);
    this.state = {
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    // this will be changed to a page that the nurse can put a small note on
    this.props.changeViewState('chooseButton');
  }

  componentDidMount(){
    this.props.getRequest();
    console.log("request state should now be", this.props.requestState);
  }

  render(){
    return (
      <section className='hero is-light is-fullheight'>
        <ReactCSSTransitionGroup
                transitionName='fadeTransition'
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
          <div className='button is-large is-success container has-text-centered complete-button'>
              <a className='complete-button-content'>
                <span>Complete</span>
                <span className='icon'>
                  <i className='fa fa-check'></i>
                </span>
              </a>
          </div>
          <div className='container is-outlined has-text-centered request-acknowledged-container'>
              <div className='container has-text-centered'>
                  <img className='is-focused big-circle' src={`http://localhost:8080/images/nurses/${this.props.requestState.image}`} />
              </div>
              <div className='container has-text-centered'>
                <h1 className='title is-2'> {this.props.requestState.first_name} is coming to help you.</h1>
              </div>
          </div>
        </ReactCSSTransitionGroup>
      </section>
    );
  }
}

export default RequestAcknowledged
