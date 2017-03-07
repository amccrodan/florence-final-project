import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import SelectSearch from 'react-select-search'

class PatientNewForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      passwordDoesNotMatch: false,
      fieldsEmpty: false,
      insertSuccess: false,
      nurseList: [{name: '', value: ''}],
      bedList: [{name: '', value: ''}],
    };
    this.register = this.register.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount () {
    // get request for all nurses and beds
    // I want to return an  list of
    // [
    // {name: 'Swedish', value: 'sv'},
    // {name: 'English', value: 'en'}
    // ]
    let nurseList = [{name: '', value: ''}];
    let bedList = [{name: '', value: ''}];
    axios
    .get('http://localhost:8080/api/nurses')
    .then(results => {
      results.data.forEach(item => {
        let nurse = {}
        nurse.name = `${item.first_name} ${item.last_name}`;
        nurse.value = item.id;
        nurseList.push(nurse);
      })
    })
    .then(() => {
      axios
      .get('http://localhost:8080/api/beds')
      .then(results => {
        console.log('bed data', results.data);
        results.data.forEach(item => {
          if (!item.patient_id) {
            let bed = {};
            bed.name = item.id
            bed.value = item.id
            bedList.push(bed);
          }
        })
        this.setState({
          nurseList: nurseList,
          bedList: bedList,
        })
        console.log(this.state);
      })
    })
  }

  register () {
      // first_name:  'Phil',
      // last_name: 'Doe',
      // doctor: 'Dr. Abraham Kennedy',
      // emergency_contact_name: 'Ken Doe',
      // emergency_contact_number: '(123)456-7890',
      // allergies: 'Poor indentation',
      // previous_injuries: 'none',
      // recent_illness: 'Strep throat',
      // notes: 'Thinks Annie is his long lost love', -- can be null
      // bed_id: 2,
      // nurse_id: 3
    let first_name = document.getElementsByClassName('first-name')[0].value;
    let last_name = document.getElementsByClassName('last-name')[0].value;
    let doctor = document.getElementsByClassName('doctor')[0].value;
    let emergency_contact_name = document.getElementsByClassName('emergency-contact-name')[0].value;
    let emergency_contact_number = document.getElementsByClassName('emergency-contact-number')[0].value;
    let allergies = document.getElementsByClassName('allergies')[0].value;
    let previous_injuries = document.getElementsByClassName('previous-injuries')[0].value;
    let recent_illness = document.getElementsByClassName('recent-illness')[0].value;
    let notes = document.getElementsByClassName('notes')[0].value;
    let bed_id = document.getElementsByClassName('bed-id')[0].value;
    let nurse_id = document.getElementsByClassName('nurse-id')[0].value;

    // TODO this is validation checking if you leave a required field blank
    if (first_name === '') {first_name = null}
    if (last_name === '') {last_name = null}
    if (emergency_contact_name === '') {emergency_contact_name = null}
    if (emergency_contact_number === '') {emergency_contact_number = null}
    if (allergies === '') {allergies = null}
    if (previous_injuries === '') {previous_injuries = null}
    if (recent_illness === '') {recent_illness = null}
    if (bed_id === '') {bed_id = null}
    if (nurse_id === '') {nurse_id = null}

    axios
    .post('http://localhost:8080/api/patients/', {
      first_name: first_name,
      last_name: last_name,
      doctor: doctor,
      emergency_contact_name: emergency_contact_name,
      emergency_contact_number: emergency_contact_number,
      allergies: allergies,
      previous_injuries: previous_injuries,
      recent_illness: recent_illness,
      notes: notes,
      bed_id: bed_id,
      nurse_id: nurse_id,
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.success) {
        document.getElementsByClassName('first-name')[0].value = '';
        document.getElementsByClassName('last-name')[0].value = '';
        document.getElementsByClassName('doctor')[0].value = '';
        document.getElementsByClassName('emergency-contact-name')[0].value = '';
        document.getElementsByClassName('emergency-contact-number')[0].value = '';
        document.getElementsByClassName('allergies')[0].value = '';
        document.getElementsByClassName('previous-injuries')[0].value = '';
        document.getElementsByClassName('recent-illness')[0].value = '';
        document.getElementsByClassName('notes')[0].value = '';
        document.getElementsByClassName('bed-id')[0].value = '';
        document.getElementsByClassName('nurse-id')[0].value = '';
        this.setState({insertSuccess: true});
      } else {
        this.setState({fieldsEmpty: true});
      }
    })
  }

  handleClose () {
    console.log('in handleClose');
    this.setState({
      passwordDoesNotMatch: false,
      fieldsEmpty: false,
      insertSuccess: false,
    })
  }

  render () {
    let notification = '';
    if (this.state.passwordDoesNotMatch) {
      notification = (
        <div className="notification is-danger is-80-wide" >
          <button className="delete" onClick={this.handleClose}></button>
          Error: Password Does Not Match.
        </div>
      )
    }
    if (this.state.fieldsEmpty) {
      notification = (
        <div className="notification is-danger is-80-wide">
          <button className="delete" onClick={this.handleClose}></button>
          Error: Field(s) empty.
        </div>
      )
    }
    if (this.state.insertSuccess) {
      notification = (
        <div className="notification is-success is-80-wide">
          <button className="delete" onClick={this.handleClose}></button>
          Sucess!
        </div>
      )
    }
    // const options = [
    //   {name: 'Swedish', value: 'sv'},
    //   {name: 'English', value: 'en'}
    // ];
    const nurseOptions = this.state.nurseList;
    const bedOptions = this.state.bedList;
    const registerForm = (
      <div className='login-form is-80-wide handle-overflow' key='login-form'>
        <p className='control has-icon'>
          <input className='input first-name' type='text' name='first-name' placeholder='First Name' />
          <span className='icon is-small'>
            <i className='fa fa-user' />
          </span>
        </p>
        <p className='control has-icon'>
          <input className='input last-name' type='text' name='last-name' placeholder='Last Name' />
          <span className='icon is-small'>
            <i className='fa fa-user' />
          </span>
        </p>
        <p className='control has-icon'>
          <input className='input doctor' type='text' name='doctor' placeholder="Doctor's Name" />
          <span className='icon is-small'>
            <i className='fa fa-user' />
          </span>
        </p>
        <p className='control has-icon'>
          <input className='input emergency-contact-name' type='text' name='emergency-contact-name' placeholder="Emergency Contact's Name" />
          <span className='icon is-small'>
            <i className='fa fa-user' />
          </span>
        </p>
        <p className='control has-icon'>
          <input className='input emergency-contact-number' type='text' name='emergency-contact-number' placeholder="Emergency Contact's Number: (604 333 2342)" />
          <span className='icon is-small'>
            <i className='fa fa-phone' />
          </span>
        </p>
        <p className='control has-icon'>
          <input className='input allergies' type='text' name='allergies' placeholder='Allergies' />
          <span className='icon is-small'>
            <i className='fa fa-medkit' />
          </span>
        </p>
        <p className='control has-icon'>
          <input className='input previous-injuries' type='text' name='previous-injuries' placeholder='Previous Injuries' />
          <span className='icon is-small'>
            <i className='fa fa-ambulance' />
          </span>
        </p>
        <p className='control has-icon'>
          <input className='input recent-illness' type='text' name='recent-illness' placeholder='Recent Illness' />
          <span className='icon is-small'>
            <i className='fa fa-stethoscope' />
          </span>
        </p>
        <p className='control has-icon'>
          <input className='input notes' type='text' name='notes' placeholder='Notes (optional)' />
          <span className='icon is-small'>
            <i className='fa fa-sticky-note' />
          </span>
        </p>
        <div className='control space-below'>
          <SelectSearch options={nurseOptions} className='search-input' multiple={false} value='nurse-list' name='nurse-list' placeholder="Search for a nurse" />
        </div>
        <div className='control'>
          <SelectSearch options={bedOptions} className='search-input' multiple={false} value='bed-list' name='bed-list' placeholder='Pick a Bed' />
        </div>
        <p className='control'>
          <button type='submit' className='button is-success' onClick={this.props.register}>
            Submit
          </button>
        </p>

      </div>
    )
    return (
      <ReactCSSTransitionGroup
        transitionName="fadeTransition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div>
          <h1 className='title is-1'>Add a New Patient</h1>
          {notification}
          {registerForm}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default PatientNewForm;
