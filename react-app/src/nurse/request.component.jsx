import React, { Component } from 'react';

class Request extends Component {
  render(){

    function reqCategory(request_type_id){
      switch (request_type_id){
        case 1:
          return <i className='patient-request fa fa-cutlery' aria-hidden='true'></i>
          break
        case 2:
          return <div><i className='patient-request fa fa-male' aria-hidden='true'></i> <i className='patient-request fa fa-female' aria-hidden='true'></i></div>
          break
        case 3:
          return <i className='patient-request fa fa-medkit' aria-hidden='true'></i>
          break
        case 4:
          return <i className='patient-request fa fa-question' aria-hidden='true'></i>
          break
        case 5:
          return <i className='patient-request fa fa-exclamation-triangle' aria-hidden="true"></i>
          break;
      }
    };

    function reqStatusBorderColour(request_status_id){
      switch (request_status_id){
        case 1:
          return 'pending'
          break
        case 2:
          return 'in-progress'
          break
        default:
          return ''
          break
      }
    };

    return (
      <article className={`is-child request-content ${reqStatusBorderColour(this.props.status_id)}`} key={this.props.id}>
        <div className="level columns">
          <div className="level-item column is-1 has-text-centered">
            <p className="title">5:00</p>
          </div>
          <div className="level-item column is-6">
            <p className="title"> {this.props.first_name} {this.props.last_name} </p>
            <p className="title"> Bed {this.props.bed_id} </p>
          </div>
          <div className="level-item column is-2">
            {reqCategory(this.props.request_type_id)}
          </div>
          <div className="level-item column is-2">
            <img src={this.props.img} />
          </div>
        </div>
      </article>
    )
  }
}

export default Request
