import React, {Component} from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import axios from 'axios';
import cookie from 'react-cookie';

import Login from './login.component.jsx'

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    }
    this.logIn = this.logIn.bind(this);

    this.serverRequest = axios.create({
      baseURL: 'http://localhost:8080/api/',
      withCredentials: false, // default
      headers: {'x-access-token': cookie.load('session')},
    });
  }

  logIn (bool) {
    this.setState({loggedIn: bool});
  }

  componentDidMount() {
    this.serverRequest
    .get('authenticate')
    .then(result => {
      console.log(result.data);
      if (result.data.success) {
        this.setState({loggedIn: true});
      }
    })
  }

  render(){
    let buttons = '';
    if (this.state.loggedIn) {
      buttons = (
        <div className='columns'>
          <div className='column'>
          </div>
          <div className='column is-two-thirds'>
            <Link to='/admin' activeClassName='active'>
              <button className='button is-large is-outlined login-btn'>
                Admin
              </button>
            </Link>
            <Link to='/nurse' activeClassName='active'>
              <button className='button is-large is-outlined login-btn'>
                Nurses
              </button>
            </Link>
            <Link to='/bed' activeClassName='active'>
              <button className='button is-large is-outlined login-btn'>
                Beds
              </button>
            </Link>
          </div>
          <div className='column'>
          </div>
        </div>
      )
    }
    return(
      <section className='hero is-light is-fullheight'>

      <div className='hero-body'>
        <div className='container has-text-centered'>
          <div className='columns'>
            <div className='column is-one-third'>
            </div>
            <div className='column'>
               <ReactCSSTransitionGroup
                transitionName='fadeTransition'
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>

                  <h1 className='title larger'>
                    Florence
                  </h1>
                  <h3 className='subtitle animated fadeInUp slighty-larger'>
                    Your Hospice Assistant
                  </h3>
              </ReactCSSTransitionGroup>
            </div>
            <div className='column'>
            </div>
          </div>
          <Login
          logIn={this.logIn}
          loggedIn={this.state.loggedIn} />
          <ReactCSSTransitionGroup
            transitionName='fadeTransition'
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
          {buttons}
          </ReactCSSTransitionGroup>
        </div>
      </div>
      </section>
    );
  }
}

export default Main
