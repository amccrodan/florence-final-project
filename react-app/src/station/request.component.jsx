import React, { Component } from 'react';
import moment  from 'moment';
import AssignStaffBox from './assign-staff-box.component.jsx';

class Request extends Component {
  constructor(props){
    super(props);
    this.state = {
      showDescription: '',
      showPatientHistory: ''
    };
    this.handleRespond = this.handleRespond.bind(this);
    this.showDescription = this.showDescription.bind(this);
    this.patientHistoryClickHandler = this.patientHistoryClickHandler.bind(this);
  }

  handleRespond (event) {
    event.stopPropagation();
    this.props.respondToRequest(this.props.bed_id, this.props.id);
  }

  showDescription () {
    if (!this.state.showDescription) {
      this.setState({showDescription: 'is-active'});

      if(this.state.showPatientHistory){
        this.setState({showPatientHistory: ''});
      }
    } else {
      this.setState({showDescription: ''});
    }
  }

  patientHistoryClickHandler (event){
    event.stopPropagation();
    if(!this.state.showPatientHistory){
      this.setState({showPatientHistory: 'is-active'})
    }else{
      this.setState({showPatientHistory: ''});
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
      <article className={`is-child request-content ${reqStatusBorderColour(this.props.status_id)} ${checkReqType(this.props.request_type_id)}`} key={this.props.id} onClick={this.showDescription}>
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
            { this.props.requestsAssigned.indexOf(this.props.id) !== -1 ||
              this.props.status_id === 2 ||
              this.props.status_id === 3 ||
              this.props.request_type_id === 5 ||
              this.props.request_type_id === 3 ? (
              <img className='staff-picture' src={this.props.img} />
            ) : (
              <AssignStaffBox id={this.props.id} assignStaffToRequest={this.props.assignStaffToRequest}
              staffSelected={this.props.staffSelected}
              />
            )
          }
          </div>
          <div className='level-item column is-2'>
            {showRespond(this.props.status_id)}
          </div>
        </div>
        <div className={`request-description ${this.state.showDescription}`}>
          <div className='level columns'>
            <div className='level-item column is-1 has-text-centered'>
              <p>Updated {moment(this.props.updated_at).format('HH:mm')}</p>
            </div>
            <div className='level-item column is-4'>
              <p>Room: {this.props.room_num}</p>
            </div>
            <div className='level-item column is-2'>
              <p>Description:</p>
              <p>{this.props.description}</p>
            </div>
            <div className='level-item column is-2'>
              <p>Nurse:</p>
              <p>{this.props.nurse_first_name} {this.props.nurse_last_name}</p>
            </div>
            <div className='level-item column is-2'>
              <div className='block'>
                <a onClick={this.patientHistoryClickHandler} className='button'>Medical History</a>
                <div className={`modal ${this.state.showPatientHistory}`}>
                  <div className='modal-background'></div>
                  <div className='modal-content'>
                    <div className='title'> {this.props.first_name} {this.props.last_name}</div>
                    <div>Medical history: {this.props.med_hist}</div>
                  </div>
                  <button className='modal-close'></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default Request
