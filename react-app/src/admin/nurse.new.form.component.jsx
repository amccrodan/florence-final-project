import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class NurseNewForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <ReactCSSTransitionGroup
        transitionName="fadeTransition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div>
          <h1 className='title is-1'>NurseNewForm</h1>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default NurseNewForm;
