import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
	render() {
		return (
			<div>
				<nav style={{    display: "-webkit-inline-box",
    								paddingRight: "300px"}}>
					<div>
						<ul>
							<li><Link to="/add">Add User</Link></li>
							<li><Link to="/search">Search and Update User</Link></li>
						</ul>
					</div>
				</nav>
                <div className="container">
                
                </div>
			</div>
		);
	}
}

export default Nav;