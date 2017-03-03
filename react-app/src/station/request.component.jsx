import React, { Component } from 'react';
import moment  from 'moment';
import AssignStaffBox from './assign-staff-box.component.jsx';

class Request extends Component {
  constructor(props){
    super(props);
    this.state = {
      requestAck: false
      showDescription: ''
    };
    this.handleRespond = this.handleRespond.bind(this);
    this.changeRequestAck = this.changeRequestAck.bind(this);
    this.showDescription =  this.showDescription.bind(this);
  }

  handleRespond () {
    this.props.respondToRequest(this.props.bed_id, this.props.id);
  }

  changeRequestAck(){
    this.setState({ requestAck: true});
  }

  showDescription () {
    if (this.state.showDescription) {
      this.setState({showDescription: ':active'});
    }
    else {
      this.setState({showDescription: ''});
    }

  }

  render(){
    const handleRespond = this.handleRespond;

    function showRespond(req_id){
      switch (req_id) {
        case 1:
          return (
            <div className='button is-large is-success' onClick={handleRespond}>
              Respond
            </div>
          )
          break;
        case 2:
          return (
            <p className='title is-large'>
              In Progress
            </p>
          )
          break;
      case 3:
        return (
            <p className='title is-large'>
              Completed
            </p>
        )
        break;
      case 4:
        return (
            <p className='title is-large'>
              Cancelled
            </p>
        )
        break;
      }
    };

    function reqCategory(request_type_id){
      switch (request_type_id){
        case 1:
          return (
            <div style={{backgroundColor:'#276cda', color: 'white'}}className='request-category-border has-text-centered'>
              <i className='patient-request fa fa-cutlery' aria-hidden='true'></i>
            </div>
          )
          break
        case 2:
          return (
            <div style={{backgroundColor:'#F5B278', color: 'white'}} className='request-category-border has-text-centered'>
              <i className='patient-request fa fa-male' aria-hidden='true'></i><i className='patient-request fa fa-female' aria-hidden='true'></i>
            </div>
          )
          break
        case 3:
          return (
            <div style={{backgroundColor:'#00d1b2', color: 'white'}}className='request-category-border has-text-centered'>
              <i className='patient-request fa fa-medkit' aria-hidden='true'></i>
            </div>
          )
          break
        case 4:
          return (
            <div style={{backgroundColor:'#ffdd57', color: 'white'}} className='request-category-border has-text-centered'>
              <i className='patient-request fa fa-question' aria-hidden='true'></i>
            </div>
          )
          break
        case 5:
          return (
            <div style={{backgroundColor:'#ff3860', color: 'white'}} className='request-category-border has-text-centered'>
              <i className='patient-request fa fa-exclamation-triangle' aria-hidden='true'></i>
            </div>
          )
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

    function checkReqType(request_type_id){
      if (request_type_id == 5) {
        return 'emergency';
      }else{
        return '';
      }
    }

    return (
      <article className={`is-child request-content ${reqStatusBorderColour(this.props.status_id)} ${checkReqType(this.props.request_type_id)}`} key={this.props.id}>
        <div className='level columns'>
          <div className='level-item column is-1 has-text-centered'>
            <p className='title'>{moment(this.props.created_at).format('HH:mm')}</p>
          </div>
          <div className='level-item column is-4'>
            <p className='title'> {this.props.first_name} {this.props.last_name} </p>
            <p className='title'> Bed {this.props.bed_id} </p>
          </div>
          <div className='level-item column is-2'>
            {reqCategory(this.props.request_type_id)}
          </div>
          <div className='level-item column is-2'>
            { this.state.requestAck === true ||
              this.props.status_id === 2 ||
              this.props.status_id === 3 ||
              this.props.request_type_id === 5 ||
              this.props.request_type_id === 3 ? (
              <img className='staff-picture' src={`http://localhost:8080/images/nurses/${this.props.img}`} />
            ) : (
              <AssignStaffBox id={this.props.id} assignStaffToRequest={this.props.assignStaffToRequest}
              staffSelected={this.props.staffSelected}
              changeRequestAck={this.changeRequestAck}
              />
            )
          }
          </div>
          <div className='level-item column is-2'>
            {showRespond(this.props.status_id)}
          </div>
        </div>
        <div className=`request-description${this.state.showDescription}` onClick={showDescription}>
          <p>
            Request Description: {this.props.description}
          </p>
          <p>
            Assigned Nurse: {this.props.nurse_first_name} {this.props.nurse_last_name}
          </p>
          <p>
            Room Number: {this.props.room_num}
          </p>
          <p>
            Mecial History: {this.props.med_hist}
          </p>
          <p>
            Last Updated {moment(this.props.updated_at).format('HH:mm')}
          </p>
        </div>
      </article>
    );
  }
}

export default Request
