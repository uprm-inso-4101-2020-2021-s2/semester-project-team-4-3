import React, { Component } from 'react';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import '../App.css';

export default class RequestsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headers: ["rdate", "type", "start_date", "end_date", "status"],
            months: ["January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"],
            requests: [
                {
                    "rdate": "2021-03-30T04:00:00.000Z",
                    "start_date": "2021-06-01T04:00:00.000Z",
                    "end_date": "2021-06-03T04:00:00.000Z",
                    "type": "vacation",
                    "status": 1
                },
                {
                    "rdate": "2021-03-30T04:00:00.000Z",
                    "start_date": "2021-05-01T04:00:00.000Z",
                    "end_date": "2021-05-03T04:00:00.000Z",
                    "type": "sick",
                    "status": 0
                }
            ]
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps.uid !== this.props.uid) {
            //Look for paystubs of new uid (user)
        }

    }

    async getPaystubs(date) {

        axios.get('http://127.0.0.1:3001/Timesheet/' + date)
            .then((response) => {
                // handle success

                //get paystub

            })
            .catch(function (error) {
                console.log(error);
            })
    };

    renderHeader() {

        return (
            <tr className="table-header">
                <th className="col-4r">
                    <span> Date </span>
                </th>
                <th className="col-4r">
                    <span> Request Type </span>
                </th>
                <th className="col-4r">
                    <span> Requested Start Date </span>
                </th>
                <th className="col-4r">
                    <span> Requested End Date </span>
                </th>
                <th className="col-4r">
                    <span> Status </span>
                </th>
            </tr>
        );
    }


    renderRows() {
        var headers = this.state.headers;
        var months = this.state.months;
        var date;
        return this.state.requests.map(function (item, index) {
            return (
                <tr key={"item-" + index} className="table-row">

                    {
                        headers.map(function (key, index) {
                            if (key === "type") {
                                return (
                                    <td className="col-3r">
                                        <span>  {item[key]} </span>
                                    </td>
                                );
                            }
                            else if (key === "status") {
                                if (item[key] === 1) {
                                    return (
                                        <td className="col-3r">
                                            <FontAwesomeIcon icon={faCheck} size='2x' color="green" />
                                        </td>)
                                }
                                else return (
                                    <td className="col-3r">
                                        <span>  Pending </span>
                                    </td>
                                );
                            }
                            else {
                                date = new Date(item[key])
                                console.log(date)
                                return (
                                    <td className="col-3r">
                                        <span>  {months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()} </span>
                                    </td>
                                );
                            }
                        }
                        )
                    }

                </tr>
            );
        }

        );
    }

    render() {

        return (
            <div className="container">
                <div className="tableContainer">
                    <table className="responsive-table">
                        <thead>
                            {this.renderHeader()}
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}