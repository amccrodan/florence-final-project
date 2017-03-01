import React, { Component } from 'react';

class RequestPending extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  this.handleClick = this.handleClick.bind(this);

  }

  handleClick (event) {
    this.props.changeRequestState({status_id: 4}, () => {
      this.props.putRequest();
      this.props.changeRequestState({
        status_id: null,
        request_type_id: null,
        request_id: null
      }, () => {
        this.props.changeViewState('requestButton');
      });
    });
  }

  render(){
    return (
      <div>
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
        <div className='hero nice-background is-fullheight'>
        </div>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    );
  }
}

export default RequestPending
