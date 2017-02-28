import React, { Component } from 'react';
import Request from './request.component.jsx';

class RequestQueue extends Component {
  render(){
    return (
      <div className='tile is-parent is-vertical is-10 request-queue'>
        <article className='is-child request-queue-title'>
          <h1 className="title has-text-centered"> Request Queue: </h1>
        </article>
        {this.props.requests.map(request => {
          console.log("Request img should be", request.image);
          return <Request key={request.id} first_name={request.first_name} last_name={request.last_name} bed_id={request.bed_id} request_type_id={request.request_type_id} img={request.image} />
        }
        )}
      </div>
    )
  }
}

export default RequestQueue
