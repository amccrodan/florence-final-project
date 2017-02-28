import React, { Component } from 'react';

class RequestQueue extends Component {
  render(){
    return (
      <div className='tile is-parent is-vertical is-10 request-queue'>
        <article className='is-child request-queue-title'>
          <h1 className="title has-text-centered"> Request Queue: </h1>
        </article>
        {this.props.requests.map(request => {

          function reqCategory(request_type_id){
            switch (request_type_id){
              case 1:
                return <i className='patient-request fa fa-cutlery' aria-hidden='true'></i>
                break;

              case 2:
                return <div><i className='patient-request fa fa-male' aria-hidden='true'></i> <i className='patient-request fa fa-female' aria-hidden='true'></i></div>
                break;

              case 3:
                return <i className='patient-request fa fa-medkit' aria-hidden='true'></i>
                break;

              case 4:
                return <i className='patient-request fa fa-question' aria-hidden='true'></i>
                break;

              case 5:
                return <i className='patient-request fa fa-exclamation-triangle' aria-hidden="true"></i>
                break;
            }
          }

          return <article className='is-child request-content' key={request.id}>
            <div className="level columns">
              <div className="level-item column is-1 has-text-centered">
                <p className="title">5:00</p>
              </div>
              <div className="level-item column">
                <i className="fa fa-picture-o patient-avatar" aria-hidden="true"></i>
              </div>
              <div className="level-item column is-5">
                <p className="title"> {request.first_name} {request.last_name} </p>
                <p className="title"> Bed {request.bed_id} </p>
              </div>
              <div className="level-item column is-2">
                {reqCategory(request.request_type_id)}
              </div>
              <div className="level-item column is-2">
                <i className="fa fa-picture-o patient-avatar" aria-hidden="true"></i>
              </div>
            </div>
          </article>
          }
        )}
      </div>
    )
  }



}

export default RequestQueue

// fa fa medkit
// question mark

// fa fa cutlery

// fa fa male /female
