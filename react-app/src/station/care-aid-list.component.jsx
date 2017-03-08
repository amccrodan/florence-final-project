import React, { Component } from 'react';
import axios from 'axios';
import CareAid from './care-aid.component.jsx';

class CareAideList extends Component {
  constructor(props){
    super(props);
    this.state = {
      careaids: []
    };
  }

  render(){
    return (
      <div className='is-child tile nurse-list'>
        {this.props.nurses.map(nurse => {
          if (!nurse.is_nurse) {
            return <CareAid key={nurse.id}
              id={nurse.id}
              first_name={nurse.first_name}
              img={nurse.image}
              clickOnStaff={this.props.clickOnStaff}
              staffSelected={this.props.staffSelected}
            />
          }
        }
        )}
      </div>
    );
  }
}

export default CareAideList
