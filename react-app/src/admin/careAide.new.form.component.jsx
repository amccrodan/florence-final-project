import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import RegisterForm from './register.form.component.jsx';

class CareAideNewForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      passwordDoesNotMatch: false,
      fieldsEmpty: false,
      insertSuccess: false,
    };
    this.register = this.register.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  register () {
    let image = document.getElementsByClassName('image')[0].value;
    let first_name = document.getElementsByClassName('first-name')[0].value;
    let last_name = document.getElementsByClassName('last-name')[0].value;
    let password = document.getElementsByClassName('password')[0].value;
    let password_confirmation = document.getElementsByClassName('password-confirmation')[0].value;

    if (image === '') {image = null}
    if (first_name === '') {first_name = null}
    if (last_name === '') {last_name = null}
    if (password !== password_confirmation) {
      this.setState({passwordDoesNotMatch: true});
      return;
    }
    if (password === '') {password = null}

    axios
    .post(`http://${this.props.hostName}:8080/api/nurses/`, {
      first_name: first_name,
      last_name: last_name,
      image: image,
      is_nurse: false,
      password: password,
    })
    .then((response) => {
      if (response.data.success) {
        document.getElementsByClassName('image')[0].value = '';
        document.getElementsByClassName('first-name')[0].value = '';
        document.getElementsByClassName('last-name')[0].value = '';
        document.getElementsByClassName('password')[0].value = '';
        document.getElementsByClassName('password-confirmation')[0].value= '';
        this.setState({insertSuccess: true});
      } else {
        this.setState({fieldsEmpty: true});
      }
    })
  }

  handleClose () {
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

    return (
      <ReactCSSTransitionGroup
        transitionName="fadeTransition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div>
          <h1 className='title is-1'>Add a Care Aide</h1>
          {notification}
          <RegisterForm register={this.register}/>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default CareAideNewForm;
