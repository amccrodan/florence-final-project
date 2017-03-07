import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class PatientView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      patients: []
    };
  }

  getPatients(callback) {
    this.serverRequest.get('patients').then((result) => {
      this.setState({patients: results.data}, () => {
        if (callback) {
          callback();
        }
      });
    });
  }

  componentDidMount() {
    this.getPatients();
  }


  render () {
    return (
      <ReactCSSTransitionGroup
        transitionName="fadeTransition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div className='tile is-parent is-vertical is-10 request-queue'>
          {this.props.patients.map(patient => {
            return <Patient key={patient.id}
              id={patient.id}
              first_name={patient.first_name}
              last_name={patient.last_name}
              bed={patient.bed_id}
              room={patient.room_id}
              />
          }
          )}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default PatientView;
