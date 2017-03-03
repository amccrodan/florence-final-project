import React, { PropTypes } from 'react';

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
      <div>
        <h1>NO PATIENT</h1>
        <div className='button is-info' onClick={this.handleBack}>Go Back</div>
      </div>
    );
  }
}

export default NoPatient;
