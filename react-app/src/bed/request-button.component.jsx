import React, { Component } from 'react';

class RequestButton extends Component {
  render(){
    return (
      <section className="hero is-light is-fullheight nice-background">

        <div className="hero-body">
          <div className="container has-text-centered">
            <div>
              <div className="columns">

                <div className="column is-one-third">
                </div>
                <div className="column">
                  <a className="button is-focused big-circle">Request</a>
                </div>
                <div className="column">
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default RequestButton