import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Nurse from './nurse.component.jsx';
import axios from 'axios';
import cookie from 'react-cookie';


class NurseView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nurses: []
    };

    this.serverRequest = axios.create({
      baseURL: 'http://localhost:8080/api/',
      withCredentials: false, // default
      headers: {'x-access-token': cookie.load('session')},
    });

  }

  getNurses(callback) {
    this.serverRequest.get('nurses').then((results) => {
      this.setState({nurses: results.data}, () => {
        if (callback) {
          callback();
        }
      });
    });
  }

  componentDidMount() {
    this.getNurses();
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
          <h1 className='title is-1'>View Nurses</h1>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default NurseView;
