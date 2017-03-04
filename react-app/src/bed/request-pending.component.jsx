import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class RequestPending extends Component {
  constructor(props){
    super(props);
    this.state = {
      time: ''
    };
  this.handleClick = this.handleClick.bind(this);
  this.getElapsedTime = this.getElapsedTime.bind(this);
  }

  getElapsedTime() {
    this.props.getRequest();
    const createdAt = this.props.requestState.createdAt;
    const now = moment();
    const elapsedTime = moment.duration(now.diff(createdAt));
    this.setState({ time: elapsedTime });
  }

  this.getElapsedTime();
  this.clockTimer = setInterval(this.getElapsedTime, 1000);

  componentWillUnmount () {
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
      <div>
        <ReactCSSTransitionGroup
            transitionName='fadeTransition'
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
          <section className='container'>
            <div className='hero'>
              <div className='hero-body'>
                <div className='container has-text-centered'>
                  <h1 className='title'>Awaiting response</h1>
                </div>
              </div>
            </div>
          </section>
          <section className='hero is-light is-fullheight'>
            <div className='hero-body'>
              <div className='container has-text-centered'>
                <div className='columns'>
                  <div className='column is-one-third'>
                  </div>
                  <div className='column'>
                    <div className='button is-danger cancel-request' onClick={this.handleClick}>
                        <h1 className='title is-1'>Cancel</h1>
                      </div>
                  </div>
                  <div className='column'>
                    <p> Hello {this.state.time}</p>
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
