import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      clicked: false
    }
    this.dropDown = this.dropDown.bind(this);
  }

  dropDown () {
    this.setState({clicked: true})
  }

  render() {
    let loginForm = '';
    if (this.state.clicked) {
      loginForm = (
        <form className='login-form' key='login-form'>
          <p className='control has-icon'>
            <input className='input' type='text' name='first_name' placeholder='First Name' />
            <span className='icon is-small'>
              <i className='fa fa-user' />
            </span>
          </p>
          <p className='control has-icon'>
            <input className='input' type='text' name='last_name' placeholder='Last Name' />
            <span className='icon is-small'>
              <i className='fa fa-user' />
            </span>
          </p>
          <p className='control has-icon'>
            <input className='input' type='password' name='password' placeholder='Password' />
            <span className='icon is-small'>
              <i className='fa fa-lock' />
            </span>
          </p>
          <p className='control'>
          <button className='button is-success'>
          Login
          </button>
          </p>
        </form>
      )
    }
    return (
      <div>
        <div className='level'>
          <div className='level-item has-text-centered'>
            <a className='nav-item is-white login' onClick={this.dropDown}>Login</a>
          </div>
        </div>

        <div className='level'>
          <div className='level-item has-text-centered'>
            <ReactCSSTransitionGroup
              transitionName='fadeTransition'
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
