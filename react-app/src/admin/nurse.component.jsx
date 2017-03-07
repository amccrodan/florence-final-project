import React, { Component } from 'react';
 class Nurse extends Component{
   constructor(props){
     super(props);
     this.state = {};
   }

   render () {
     return (
           <tr className='admin-table-row'>
             <td className='admin-table-data'>{this.props.id}</td>
             <td className='admin-table-data'>{this.props.first_name} {this.props.last_name}</td>
           </tr>
        );
   }
 }

export default Nurse;
