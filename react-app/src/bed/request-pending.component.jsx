import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';

class RequestPending extends Component {
  constructor(props){
    super(props);
    this.state = {
      time: '00:00'
    };
    this.handleClick = this.handleClick.bind(this);
    this.getElapsedTime = this.getElapsedTime.bind(this);
  }

  getElapsedTime() {
    let createdAt = moment(this.props.requestState.createdAt);
    let now = moment();
    let time = moment.utc(moment(now, "HH:mm:ss").diff(moment(createdAt, "HH:mm:ss"))).format("mm:ss");
    this.setState({time: time});
  }

  componentDidMount() {
    this.clockTimer = setInterval(this.getElapsedTime, 990);
  }

  componentWillUnmount() {
    clearInterval(this.clockTimer);
  }

  handleClick (event) {
    this.props.changeRequestState({status_id: 4}, () => {
      this.props.putRequest();
      this.props.changeViewState('requestButton');
    });
  }

  render(){
    return (
      <div className='hero is-light'>
        <ReactCSSTransitionGroup
            transitionName='fadeTransition'
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>

          <section className='hero is-light full-height'>
            <div className='hero-body'>
              <div className='container has-text-centered'>
                <div className='columns'>
                  <div className='column is-one-third'>
                  </div>
                  <div className='column'>
                   <h1 className='title awaiting-title'>Awaiting response...</h1>
                    <div className='button is-danger cancel-request' onClick={this.handleClick}>
                      <h1 className='title is-1'>Cancel</h1>
                    </div>
                      <p className='title '>{this.state.time}</p>
                  </div>
                  <div className='column'>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default RequestPending
