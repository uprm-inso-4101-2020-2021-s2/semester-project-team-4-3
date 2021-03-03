import React, { Component } from 'react';

//Stateless Functional Component

// const NavBar = ({ totalCounters }) => {
//     return (<nav className="navbar navbar-light bg-light">
//         <a href="#" className="navbar-brand">
//             Lab San Antonio <span className="badge badge-pill badge-secondary">
//                 {totalCounters}
//             </span>
//         </a>
//     </nav>);
// };

class NavBar extends Component {
    //state = {  }
    render() {
        return (<nav className="navbar navbar-dark bg-dark navbar-expand-sm shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
                TimeRoll
            </a>

            <ul className="navbar-nav ml-auto px-3">
                <li className="nav-item mr-auto">
                    <a className="nav-link"> Employee </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link"> Sign out</a>
                </li>
            </ul>
        </nav>);
    }
}

export default NavBar;