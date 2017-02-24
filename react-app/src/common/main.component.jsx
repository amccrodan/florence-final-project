import React, {Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {
    render(){
        return(
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/nurse">Nurses</Link></li>
                    <li><Link to="/bed">Beds</Link></li>
                </ul>
            </div>
        );
    }
}

export default Main