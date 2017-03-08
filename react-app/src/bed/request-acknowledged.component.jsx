import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';
import axios from 'axios';

class RequestAcknowledged extends Component {
  constructor(props){
    super(props);
    this.state = {
      time: '00:00',
      showAuthenticate: '',
      wrongPassword: ''
    };
    this.getElapsedTime = this.getElapsedTime.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.submitModal = this.submitModal.bind(this);
  }

  submitModal(event) {
    const first_name = this.props.nurseInfo.first_name;
    const last_name = this.props.nurseInfo.last_name;
    const password = document.getElementsByClassName('verifyPass')[0].value;
    const nurse_log = document.getElementsByClassName('nurse-log')[0].value;

    axios.post('http://localhost:8080/api/authenticate', {
      first_name: first_name,
      last_name: last_name,
      password: password
    })
    .then((response) => {
      if (response.data.success) {
        this.props.changeRequestState({status_id: 3, nurse_log: nurse_log}, () => {
          this.props.putRequest();
          this.props.changeViewState('requestButton');
        });
      } else {
        this.setState({wrongPassword: 'is-danger'});
      }
    }).catch(err => {
      console.log(err);
    })
  }

  toggleModal(event) {
    const newState = (this.state.showAuthenticate === '') ? 'is-active auth' : '';
    this.setState({showAuthenticate: newState});
  }

  getElapsedTime() {
    let createdAt = moment(this.props.requestState.createdAt);
    let now = moment();
    let time = moment.utc(moment(now, 'HH:mm:ss').diff(moment(createdAt, 'HH:mm:ss'))).format('mm:ss');
    this.setState({time: time});
  }

  componentDidMount(){
    this.props.getNurseInfo();
    this.clockTimer = setInterval(this.getElapsedTime, 990);
  }

  componentWillUnmount() {
    clearInterval(this.clockTimer);
  }

  render(){
    return (
      <div>
        <section className='hero is-light is-fullheight'>
          <ReactCSSTransitionGroup
                  transitionName='fadeTransition'
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
            <div onClick={this.toggleModal} className='button is-large is-success container has-text-centered complete-button'>
                  <span>Complete</span>
                  <span className='icon'>
                    <i className='fa fa-check'></i>
                  </span>
            </div>
            <div className='container is-outlined has-text-centered request-acknowledged-container'>
                <div className='container has-text-centered'>
                    <img className='is-focused big-circle' src={this.props.nurseInfo.image} />
                </div>
                <div className='container has-text-centered'>
                  <h1 className='title is-2'> {this.props.nurseInfo.first_name} is coming to help you.</h1>
                  <p className='title'>{this.state.time}</p>
                </div>
            </div>
          </ReactCSSTransitionGroup>
        </section>
        <div className={`modal ${this.state.showAuthenticate}`}>
          <div className='modal-background' onClick={this.toggleModal}></div>
            <div className='modal-content'>
              <div className='auth-title'>Attending: {this.props.nurseInfo.first_name} {this.props.nurseInfo.last_name}</div>
              <hr></hr>
              Notes
              <p className='control'>
                <textarea className='textarea nurse-log'></textarea>
              </p>
              <p className='control'>
                <input className={`input verifyPass ${this.state.wrongPassword}`} type='password' placeholder='Verify password' />
              </p>
              <div className='auth-modal-footer'>
                <button className='button is-light' onClick={this.toggleModal}>Cancel</button>
                <button className='button is-success' onClick={this.submitModal}>Submit</button>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default RequestAcknowledged
