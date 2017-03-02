import React, { Component } from 'react';
import Request from './request.component.jsx';

class RequestQueue extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){
    return (
      <div className='tile is-parent is-vertical is-10 request-queue'>
        {this.props.requests.map(request => {
          return <Request key={request.request_id}
            first_name={request.first_name}
            last_name={request.last_name}
            bed_id={request.bed_id}
            request_type_id={request.request_type_id}
            img={request.image}
            status_id={request.status_id}
            created_at={request.created_at}
            updated_at={request.updated_at}
            respondToRequest={this.props.respondToRequest}
            id={request.request_id}
            />
        }
        )}
      </div>
    );
  }
}

export default RequestQueue
