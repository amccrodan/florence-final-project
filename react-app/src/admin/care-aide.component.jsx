import React, { Component } from 'react';
 class CareAide extends Component{
   constructor(props){
     super(props);
     this.state = {};
   }

   render () {
     return (
           <tr>
             <th className='admin-table-header'>{this.props.id}</th>
             <td className='admin-table-data'>{this.props.first_name} {this.props.last_name}</td>
             <td className='admin-table-data'>{this.props.bed}</td>
             <td className='admin-table-data'>{this.props.room}</td>
           </tr>
        );
   }
 }

export default CareAide;
