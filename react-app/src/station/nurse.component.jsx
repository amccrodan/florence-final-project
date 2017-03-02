import React, { Component } from 'react';
import ReactDragula from 'react-dragula';


class Nurse extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }

  // componentDidMount(){
  //   const container = React.findDOMNode(this);
  //   dragula([container]);
  // }

  render(){
    return (
      <article className='container has-text-centered'>
        <img className="staff-picture" src={ `http://localhost:8080/images/nurses/${this.props.img}`} />
        <p> {this.props.first_name} </p>
      </article>
    );
  }
}

export default Nurse