import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class RegisterForm extends React.Component {

  render () {
    const registerForm = (
      <div className='login-form is-80-wide' key='login-form'>
        <p className='control has-icon'>
          <input className='input image' type='text' name='image' placeholder='Add An Image link' />
          <span className='icon is-small'>
            <i className='fa fa-picture-o' />
          </span>
        </p>
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
        <p className='control has-icon'>
          <input className='input password-confirmation' type='password' name='password_confirmation' placeholder='Confirm Password' />
          <span className='icon is-small'>
            <i className='fa fa-lock' />
          </span>
        </p>
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
        {registerForm}
      </ReactCSSTransitionGroup>
    );
  }
}

export default RegisterForm;
