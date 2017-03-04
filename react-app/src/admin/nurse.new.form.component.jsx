import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class NurseNewForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
    this.register = this.register.bind(this);
  }

  register () {
    const image = document.getElementsByClassName('image')[0].value;
    const first_name = document.getElementsByClassName('first-name')[0].value;
    const last_name = document.getElementsByClassName('last-name')[0].value;
    const password = document.getElementsByClassName('password')[0].value;
    const password_confirmation = document.getElementsByClassName('password-confirmation')[0].value;

    axios
    .post('http://localhost:8080/api/authenticate', {
      first_name: first_name,
      last_name: last_name,
      password: password
    })
    .then((response) => {
      console.log(response.data);
      if (!response.data.success) {
        console.log(response.data.message);
      }
      this.props.logIn(response.data.success);
      cookie.save('session', response.data.token, { path: '/' });
    }).catch(err => {
      console.log(err);
    })

  }

  render () {
    const loginForm = (
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
          <input className='input password-confirmation' type='password_confirmation' name='password_confirmation' placeholder='Confirm Password' />
          <span className='icon is-small'>
            <i className='fa fa-lock' />
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
          <h1 className='title is-1'>NurseNewForm</h1>
          {loginForm}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default NurseNewForm;
