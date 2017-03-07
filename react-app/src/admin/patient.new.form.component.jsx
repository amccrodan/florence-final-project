import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

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
    this.updateEmptyBeds = this.updateEmptyBeds.bind(this);
  }

  componentDidMount () {

    let nurseList = [{name: 'Choose a Nurse', value: null}];
    axios
    .get('http://localhost:8080/api/nurses')
    .then(results => {
      results.data.forEach(item => {
        if (item.is_nurse) {
          let nurse = {}
          nurse.name = `${item.first_name} ${item.last_name}`;
          nurse.value = item.id;
          nurseList.push(nurse);
        }
      })
    })
    .then(() => {
      this.setState({
        nurseList: nurseList
      })
      this.updateEmptyBeds();
    })
  }

  updateEmptyBeds(){
    let bedList = [{name: 'Choose a Bed', value: null}];
    axios
    .get('http://localhost:8080/api/beds')
    .then(results => {
      results.data.forEach(item => {
        if (!item.patient_id) {
          let bed = {};
          bed.name = item.id
          bed.value = item.id
          bedList.push(bed);
        }
      })
      this.setState({
        bedList: bedList,
      })
    })
  }

  register () {
    console.log('in register');''

    // TODO get index of selected component


    let first_name = document.getElementsByClassName('first-name')[0].value;
    let last_name = document.getElementsByClassName('last-name')[0].value;
    let doctor = document.getElementsByClassName('doctor')[0].value;
    let emergency_contact_name = document.getElementsByClassName('emergency-contact-name')[0].value;
    let emergency_contact_number = document.getElementsByClassName('emergency-contact-number')[0].value;
    let allergies = document.getElementsByClassName('allergies')[0].value;
    let previous_injuries = document.getElementsByClassName('previous-injuries')[0].value;
    let recent_illness = document.getElementsByClassName('recent-illness')[0].value;
    let notes = document.getElementsByClassName('notes')[0].value;
    let nurse_id = null;
    let bed_id = null;

    let nurseCollection =  document.getElementsByClassName('nurse-id');
    for (let nurse in nurseCollection) {
      if (nurseCollection[nurse].selected) {
        nurse_id = nurseCollection[nurse].value;
      }
    }
    let bedCollection = document.getElementsByClassName('bed-id');
    for (let bed in bedCollection) {
      if (bedCollection[bed].selected) {
        bed_id = bedCollection[bed].value;
      }
    }

    console.log('bed', bed_id);
    console.log('nurse', nurse_id);
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
        document.getElementsByClassName('nurse-id')[0].selected = true;
        document.getElementsByClassName('bed-id')[0].select = true;
        this.setState({insertSuccess: true});
        this.updateEmptyBeds();
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
        <p className="control">
          <span className="select">
            <select>
              {this.state.nurseList.map(item => {
                return <option className='nurse-id' value={item.value} key={item.value}>{item.name}</option>
              })}

            </select>
          </span>
        </p>
        <p className="control">
          <span className="select">
            <select>
              {this.state.bedList.map(item => {
                return <option className='bed-id' value={item.value} key={item.value}>{item.name}</option>
              })}

            </select>
          </span>
        </p>

        <p className='control'>
          <button type='submit' className='button is-success' onClick={this.register}>
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
