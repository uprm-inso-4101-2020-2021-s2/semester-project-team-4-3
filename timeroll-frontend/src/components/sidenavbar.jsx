import { getQueriesForElement } from '@testing-library/react';
import React, { Component } from 'react';
import { faHome, faTable, faFileInvoice, faCalendarCheck, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import '../App.css';


class SideNavBar extends Component {
    state = {}

    heading = {
        fontSize: 20,
        fontWeight: "bold",
        cursor: "pointer",

    };

    item = {
        fontSize: 20
    };

    navItems = {
        fontSize: 20,
        display: "flex",
        flexDirection: "row",
        margin: 20,
        borderBottom: 2,
        borderColor: "black"
    };

    render() {
        return (
            <div style={this.heading} className={"sideNav bg-light border-right"}>
                <div className="list-group list-group-flush">
                    <Link to={"/"} style={this.item} className="list-group-item list-group-item-action bg-light">
                        <FontAwesomeIcon className="iconsPadding" icon={faTable} />
                                    Timesheet
                    </Link>

                    <Link to={"/paystub"} style={this.item} className="list-group-item list-group-item-action bg-light">
                        <FontAwesomeIcon className="iconsPadding" icon={faFileInvoice} />
                                Pay Stubs
                    </Link>

                    <a style={this.item} className="list-group-item list-group-item-action bg-light">
                        <FontAwesomeIcon className="iconsPadding" icon={faCalendarCheck} />
                                    Requests
                    </a>

                    <a style={this.item} className="list-group-item list-group-item-action bg-light">
                        <FontAwesomeIcon className="iconsPadding" icon={faCog} />
                                Settings
                    </a>


                    {/* <ul className="nav flex-column">
                        <li className="nav-item">
                            <a style={this.navItems} className="nav-link text-secondary">
                                <FontAwesomeIcon className="iconsPadding" icon={faTable} />
                                Timesheet
                            </a>
                        </li>

                        <li className="nav-item">
                            <a style={this.navItems} className="nav-link text-secondary">
                                <FontAwesomeIcon className="iconsPadding" icon={faFileInvoice} />
                                Pay
                            </a>
                        </li>

                        <li className="nav-item">
                            <a style={this.navItems} className="nav-link text-secondary">
                                <FontAwesomeIcon className="iconsPadding" icon={faCalendarCheck} />
                                Requests
                            </a>
                        </li>

                        <li className="nav-item">
                            <a style={this.navItems} className="nav-link text-secondary">
                                <FontAwesomeIcon className="iconsPadding" icon={faCog} />
                                Settings
                            </a>
                        </li>
                    </ul> */}
                </div>
            </div>);
    }
}

export default SideNavBar;