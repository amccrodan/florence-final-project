import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CareAide from './care-aide.component.jsx';
import axios from 'axios';
import cookie from 'react-cookie';

class CareAideView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      care_aides: []
    };

    this.getCareAides = this.getCareAides.bind(this);

    this.serverRequest = axios.create({
      baseURL: 'http://localhost:8080/api/',
      withCredentials: false, // default
      headers: {'x-access-token': cookie.load('session')},
    });

  }

  filterNurses(nurse) {
    if (nurse.is_nurse === false){
      return nurse;
    }
  }

  getCareAides(callback) {
    this.serverRequest.get('nurses').then((result) => {
      const filtered = result.data.filter(this.filterNurses);
      this.setState({care_aides: filtered}, () => {
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
        <table className='table is-striped admin-table'>
          <thead className='admin-table-head'>
            <tr>
              <th className='admin-table-header'>ID</th>
              <th className='admin-table-header'>Name</th>
            </tr>
          </thead>
          <tbody className='admin-table-body'>
          {this.state.care_aides.map(care_aide => {
            return <CareAide key={care_aide.id}
              first_name={care_aide.first_name}
              last_name={care_aide.last_name}
              id={care_aide.id}
              />
          }
          )}
          </tbody>
        </table>
      </ReactCSSTransitionGroup>
    );
  }
}

export default CareAideView;
