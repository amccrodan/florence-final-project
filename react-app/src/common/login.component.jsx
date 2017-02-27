import React, { Component } from 'react';

require("../../js/login.js");


class Login extends Component {
  render(){
    return (
      <div>
        <div className='level'>
          <div className='level-item has-text-centered'>
            <a className="nav-item is-white login">Login</a>
          </div>
        </div>

        <div className="level">
          <div className="level-item has-text-centered">

            <form className="login-form">
              <p className="control has-icon">
                <input className="input" type="text" name="first_name" placeholder="First Name" />
                <span className="icon is-small">
                  <i className="fa fa-user" />
                </span>
              </p>
              <p className="control has-icon">
                <input className="input" type="text" name="last_name" placeholder="Last Name" />
                <span className="icon is-small">
                  <i className="fa fa-user" />
                </span>
              </p>
              <p className="control has-icon">
                <input className="input" type="password" name="password" placeholder="Password" />
                <span className="icon is-small">
                  <i className="fa fa-lock" />
                </span>
              </p>
              <p className="control">
              <button className="button is-success">
              Login
              </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login
