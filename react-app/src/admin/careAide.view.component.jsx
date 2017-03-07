import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CareAide from './care-aide.component.jsx';
import axios from 'axios';
import cookie from 'react-cookie';

class CareAideView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      care_aide: []
    };

    this.serverRequest = axios.create({
      baseURL: 'http://localhost:8080/api/',
      withCredentials: false, // default
      headers: {'x-access-token': cookie.load('session')},
    });

  }

  getCareAides(callback) {
    this.serverRequest.get('nurses').then((results) => {
      this.setState({care_aide: results.data}, () => {
        if (callback) {
          callback();
        }
      });
    });
  }

  componentDidMount() {
    this.getCareAides();
  }

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
