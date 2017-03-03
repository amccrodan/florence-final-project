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

  render(){
    return (
      <section className='hero is-light is-fullheight'>
      <ReactCSSTransitionGroup
              transitionName='fadeTransition'
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
        <div className='hero-body'>
          <div className='complete'>
            <a className='button is-success'>
              <span className='icon is-small'>
                <i className='fa fa-check'></i>
              </span>
              <span>Complete</span>
            </a>
          </div>
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
          <h1 className='title'>Insert nurses name here is coming to help you </h1>
        </div>
        </ReactCSSTransitionGroup>
      </section>
    );
  }
}

export default RequestAcknowledged
