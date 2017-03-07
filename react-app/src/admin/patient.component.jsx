import React, { Component } from 'react';
 class Patient extends Component{
   constructor(props){
     super(props);
     this.state = {};
   }

   render () {
     return (
           <tr>
             <th>{this.props.id}</th>
             <td>{this.props.first_name} {this.props.last_name}</td>
             <td>{this.props.bed}</td>
             <td>{this.props.room}</td>
           </tr>
        );
   }
 }

export default Patient;
