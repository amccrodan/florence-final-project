import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ButtonSet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <section className='hero is-light is-fullheight'>
        <ReactCSSTransitionGroup
          transitionName="fadeTransition"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <h1 className='title awaiting-title has-text-centered'>Bed {this.props.currentBed}</h1>
          <div className='hero-body'>
            <div className='container has-text-centered'>
              <div className='button is-focused is-success choices' onClick={this.props.handleRequest}>
                <h1 className='title is-1'>Request</h1>
              </div>
              <div className='button is-danger choices' onClick={this.props.emergencyRequest}>
                <i className='request-category fa fa-exclamation-triangle' aria-hidden='true'></i>
              </div>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </section>
    );
  }
}

export default ButtonSet;
