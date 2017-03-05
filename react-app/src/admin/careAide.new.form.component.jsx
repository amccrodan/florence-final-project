import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RegisterForm from './register.form.component.jsx';

class CareAideNewForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  register () {
    const image = document.getElementsByClassName('image')[0].value;
    const first_name = document.getElementsByClassName('first-name')[0].value;
    const last_name = document.getElementsByClassName('last-name')[0].value;
    const password = document.getElementsByClassName('password')[0].value;
    const password_confirmation = document.getElementsByClassName('password-confirmation')[0].value;

    axios
    .post('http://localhost:8080/api/nurses/', {
      first_name: first_name,
      last_name: last_name,
      image: image,
      is_nurse: false,
      password: password,
    })
    .then((response) => {
      console.log(response.data);
    })

  }

  render () {
    return (
      <ReactCSSTransitionGroup
        transitionName="fadeTransition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div>
          <h1 className='title is-1'>Add a Care Aide</h1>
          <RegisterForm register={this.props.register}/>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default CareAideNewForm;
