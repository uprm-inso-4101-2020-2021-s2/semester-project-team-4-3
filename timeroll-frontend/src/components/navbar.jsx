import React, { Component } from 'react';

//Stateless Functional Component

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name
        }
    }
    //state = {  }
    render() {
        return (<nav className="navbar navbar-dark bg-dark navbar-expand-sm shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
                TimeRoll
            </a>

            <ul className="navbar-nav ml-auto px-3">
                <li className="nav-item mr-auto">
                    <a className="nav-link"> {this.state.name} </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link"> Sign out</a>
                </li>
            </ul>
        </nav>);
    }
}

export default NavBar;