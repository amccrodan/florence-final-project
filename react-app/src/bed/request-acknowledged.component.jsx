import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';

class RequestAcknowledged extends Component {
  constructor(props){
    super(props);
    this.state = {
      time: '00:00'
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    this.props.changeRequestState({status_id: 3}, () => {
      this.props.putRequest();
      this.props.changeViewState('requestButton');
    });
  }

  getElapsedTime() {
    console.log('Getting time');
    let createdAt = moment(this.props.requestState.createdAt);
    let now = moment();
    let time = moment.utc(moment(now, "HH:mm:ss").diff(moment(createdAt, "HH:mm:ss"))).format("mm:ss");
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
      <section className='hero is-light is-fullheight'>
        <ReactCSSTransitionGroup
                transitionName='fadeTransition'
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
          <div onClick={this.handleClick} className='button is-large is-success container has-text-centered complete-button'>
              <a className='complete-button-content'>
                <span>Complete</span>
                <span className='icon'>
                  <i className='fa fa-check'></i>
                </span>
              </a>
          </div>
          <div className='container is-outlined has-text-centered request-acknowledged-container'>
              <div className='container has-text-centered'>
                  <img className='is-focused big-circle' src={`http://localhost:8080/images/nurses/${this.props.nurseInfo.image}`} />
              </div>
              <div className='container has-text-centered'>
                <p className='title'>{this.state.time}</p>
                <h1 className='title is-2'> {this.props.nurseInfo.first_name} is coming to help you.</h1>
              </div>
          </div>
        </ReactCSSTransitionGroup>
      </section>
    );
  }
}

export default RequestAcknowledged
