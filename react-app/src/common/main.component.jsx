import React, {Component} from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import Login from './login.component.jsx'

class Main extends Component {
  render(){
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
                  <h1 className='title'>
                    Florence
                  </h1>
                  <h3 className='subtitle animated fadeInUp'>
                    Your Hospice Assistant
                  </h3>
              </ReactCSSTransitionGroup>
            </div>
            <div className='column'>
            </div>
          </div>

          <Login />

          <Link to='/nurse' activeClassName='active'>
            <button className='button is-large is-dark'>
              Nurses
            </button>
          </Link>
          <Link to='/bed' activeClassName='active'>
            <button className='button is-large is-dark'>
              Beds
            </button>
          </Link>

        </div>
      </div>

      </section>
    );
  }
}

export default Main
