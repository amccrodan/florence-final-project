import React, { Component } from 'react';
 class Patient extends Component{
   constructor(props){
     super(props);
     this.state = {};
   }

   render () {
     return (
       <table className="table is-striped">
         <thead>
           <tr>
             <th>ID</th>
             <th>Name</th>
             <th>Bed</th>
             <th>Room</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <th>{this.props.id}</th>
             <td>{this.props.first_name} {this.props.last_name}</td>
             <td>{this.props.bed}</td>
             <td>{this.props.room}</td>
           </tr>
         </tbody>
       </table>

     );
   }
 }

export default Patient;
