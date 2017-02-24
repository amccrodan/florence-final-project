import React, {Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {
render(){
  return(
    <div>
      <a className="navbar-brand" href="#">Florence</a>
      <ul>
        <li><Link to="/" activeClassName="active">Home</Link></li>
        <li><Link to="/nurse" activeClassName="active">Nurses</Link></li>
        <li><Link to="/bed" activeClassName="active">Beds</Link></li>
      </ul>
        <div className="container">
          {this.props.children}
        </div>
    </div>
  );
}
}

export default Main