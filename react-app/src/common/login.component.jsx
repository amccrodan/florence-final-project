import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import axios from 'axios';
import cookie from 'react-cookie';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      clicked: false,
      hidden: '',
      errors: {
        firstNameBlank: false,
        lastNameBlank: false,
        passwordBlank: false,
      }
    }
    this.dropDown = this.dropDown.bind(this);
    this.postLogin = this.postLogin.bind(this);
    this.removeError = this.removeError.bind(this);
  }

  dropDown () {
    this.setState({
      clicked: true,
      hidden: 'is-hidden'
    })
  }

  postLogin () {
    const first_name = document.getElementsByClassName('first-name')[0].value;
    const last_name = document.getElementsByClassName('last-name')[0].value;
    const password = document.getElementsByClassName('password')[0].value;

    if (first_name == '') {
      this.setState({errors: {firstNameBlank: true}})
    } else if (last_name === '') {
      this.setState({errors:{firstNameBlank: true}})
    } else if (password === '') {
      this.setState({errors: {firstNameBlank: true}})
    } else {
      axios
      .post('http://localhost:8080/api/authenticate', {
        first_name: first_name,
        last_name: last_name,
        password: password
      })
      .then((response) => {
        if (!response.data.success) {
        }
        this.props.logIn(response.data.success);
        cookie.save('session', response.data.token, { path: '/' });
      }).catch(err => {
        console.log(err);
      }
    )}
  }

  removeError (errorName) {
    this.setState({errors: {errorName: false}})
  }

  render() {
    let loginForm = '';
    let loginText = '';
    if (!this.props.loggedIn) {
      loginText = <div className='level-item has-text-centered'>
        <a
        className={`nav-item is-white login ${this.state.hidden}`}
        onClick={this.dropDown}>Login
        </a>
      </div>
    }
    if (this.state.clicked && !this.props.loggedIn) {
      loginForm = (
        <div className='login-form' key='login-form'>
          <p className='control has-icon'>
            <input className='input first-name' type='text' name='first_name' placeholder='First Name' />
            <span className='icon is-small'>
              <i className='fa fa-user' />
            </span>
          </p>
          <p className='control has-icon'>
            <input className='input last-name' type='text' name='last_name' placeholder='Last Name' />
            <span className='icon is-small'>
              <i className='fa fa-user' />
            </span>
          </p>
          <p className='control has-icon'>
            <input className='input password' type='password' name='password' placeholder='Password' />
            <span className='icon is-small'>
              <i className='fa fa-lock' />
            </span>
          </p>
          <p className='control'>
          <button type='submit' className='button is-success' onClick={this.postLogin}>
            Login
          </button>
          </p>
        </div>
      )
    }

    let errorFirstNameBlank = '';
    let errorLastNameBlank = '';
    let errorPasswordBlank = '';
    if (this.state.errors.firstNameBlank) {
      errorFirstNameBlank = (
        <div className="notification is-danger">
          <button className="delete" onClick={this.removeError.bind(this,'firstNameBlank')}></button>
          First name is blank
        </div>
      )
    }
    if (this.state.errors.firstNameBlank) {
      errorLastNameBlank = (
        <div className="notification is-danger">
          <button className="delete"></button>
          Last name is blank
        </div>
      )
    }
    if (this.state.errors.firstNameBlank) {
      errorPasswordBlank = (
        <div className="notification is-danger">
          <button className="delete"></button>
          Password is blank
        </div>
      )
    }
    return (
      <div>
        <div className='level'>
          {loginText}
        </div>
        <div className='level'>
          <div className='level-item has-text-centered'>
            <ReactCSSTransitionGroup
              transitionName='fadeTransition'
              transitionEnterTimeout={500}
              transitionLeaveTimeout={100}>
                {errorFirstNameBlank}
                {errorLastNameBlank}
                {errorPasswordBlank}
                {loginForm}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Login
