import React, {Component} from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import Login from './login.component.jsx'

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    }
    this.logIn = this.logIn.bind(this);
    this.changeType = this.changeType.bind(this);
  }

  logIn (bool) {
    this.setState({loggedIn: bool});
    this.props.route.loggedIn.loggedIn = true;
    console.log('in login (main)', this.props.route);
  }

  changeType (type) {
    this.props.route.loggedIn.asType = type;
  }

  render(){
    let buttons = '';
    if (this.state.loggedIn) {
      buttons = (
        <div>
          <Link to="/nurse" activeClassName="active">
            <button className="button is-large is-dark" onClick={this.changeType.bind(this,'nurse')}>
              Nurses
            </button>
          </Link>
          <Link to="/bed" activeClassName="active">
            <button className="button is-large is-dark" onClick={this.changeType.bind(this,'bed')}>
              Beds
            </button>
          </Link>
        </div>
      )
    }
    return(
      <section className="hero is-light is-fullheight">

      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns">
            <div className="column is-one-third">
            </div>
            <div className="column">
               <ReactCSSTransitionGroup
                transitionName="fadeTransition"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                  <h1 className="title">
                    Florence
                  </h1>
                  <h3 className="subtitle animated fadeInUp">
                    Your Hospice Assistant
                  </h3>
              </ReactCSSTransitionGroup>
            </div>
            <div className="column">
            </div>
          </div>

          <Login
          logIn={this.logIn}
          loggedIn={this.state.loggedIn} />
          <ReactCSSTransitionGroup
            transitionName="fadeTransition"
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
