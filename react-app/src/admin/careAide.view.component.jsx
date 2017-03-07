import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CareAide from './care-aide.component.jsx';
import axios from 'axios';
import cookie from 'react-cookie';

class CareAideView extends React.Component {
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
          <h1 className='title is-1'>View Care Aides</h1>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default CareAideView;
