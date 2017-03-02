import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import axios from 'axios';


class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      clicked: false,
      hidden: ''
    }
    this.dropDown = this.dropDown.bind(this);
    this.postLogin = this.postLogin.bind(this);
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
    console.log(password);

    axios
    .post('http://localhost:8080/api/authenticate', {first_name: first_name, last_name: last_name})
    .then((response) => {
      console.log('Posted:');
      console.log(this.state.request);
      this.changeRequestState({request_id: response.data[0]}, () => {});
    })
  }

  render() {
    let loginForm = '';
    if (this.state.clicked) {
      loginForm = (
        <div className="login-form" key='login-form'>
          <p className="control has-icon">
            <input className="input first-name" type="text" name="first_name" placeholder="First Name" />
            <span className="icon is-small">
              <i className="fa fa-user" />
            </span>
          </p>
          <p className="control has-icon">
            <input className="input last-name" type="text" name="last_name" placeholder="Last Name" />
            <span className="icon is-small">
              <i className="fa fa-user" />
            </span>
          </p>
          <p className="control has-icon">
            <input className="input password" type="password" name="password" placeholder="Password" />
            <span className="icon is-small">
              <i className="fa fa-lock" />
            </span>
          </p>
          <p className="control">
          <button type='submit' className="button is-success" onClick={this.postLogin}>
            Login
          </button>
          </p>
        </div>
      )
    }
    return (
      <div>
        <div className='level'>
          <div className='level-item has-text-centered'>
            <a className={`nav-item is-white login ${this.state.hidden}`} onClick={this.dropDown}>Login</a>
          </div>
        </div>

        <div className="level">
          <div className="level-item has-text-centered">
            <ReactCSSTransitionGroup
              transitionName="fadeTransition"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
                {loginForm}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Login
