import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class NoPatient extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.changeViewState('chooseBed');
  }

  render () {
    return (
      <section className='hero is-light is-fullheight'>
        <div className='hero-body'>
          <div className='container has-text-centered'>
            <ReactCSSTransitionGroup
              transitionName="fadeTransition"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              <div>
                <div className="no-patient">There is no patient currently assigned to this bed</div>
                <div className='button is-large is-info' onClick={this.handleBack}>Go Back</div>
              </div>
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </section>
    );
  }
}

export default NoPatient;
