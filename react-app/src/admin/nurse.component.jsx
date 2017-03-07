import React, { Component } from 'react';
 class Nurse extends Component{
   constructor(props){
     super(props);
     this.state = {};
   }

   render () {
     return (
           <tr>
             <th className='admin-table-header'>1</th>
             <td className='admin-table-data'>Name</td>

           </tr>
        );
   }
 }

export default Nurse;
