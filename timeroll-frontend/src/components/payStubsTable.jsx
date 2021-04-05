import React, { Component } from 'react';
import axios from "axios";
import '../App.css';

export default class PayStubsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headers: ["date", "gross", "deductions", "benefits", "net"],
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
            examplePayStub: [
                {
                    "date": "2021-03-30T04:00:00.000Z",
                    "gross": 1794,
                    "deductions": 100,
                    "benefits": 50,
                    "net": 1644
                },
                {
                    "date": "2021-03-15T04:00:00.000Z",
                    "gross": 1794,
                    "deductions": 100,
                    "benefits": 50,
                    "net": 1644
                },
                {
                    "date": "2021-02-28T04:00:00.000Z",
                    "gross": 1794,
                    "deductions": 100,
                    "benefits": 50,
                    "net": 1644
                }
            ]
        }
    }

    componentDidUpdate(prevProps) {


    }

    async getPaystubs(date) {

        axios.get('http://127.0.0.1:3001/Timesheet/' + date)
            .then((response) => {
                // handle success
                console.log("going into formatting timesheet")
                this.formatTimesheetInfo(response.data)
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
                    <span> Gross pay </span>
                </th>
                <th className="col-4r">
                    <span> Deductions </span>
                </th>
                <th className="col-4r">
                    <span> Benefits </span>
                </th>
                <th className="col-4r">
                    <span> Net pay </span>
                </th>
            </tr>
        );
    }


    renderRows() {
        var paystub = this.state.examplePayStub;
        var headers = this.state.headers;
        var months = this.state.months;
        var date;
        console.log(paystub)
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
        return paystub.map(function (item, index) {
            return (
                <tr key={"item-" + index} className="table-row">

                    {
                        headers.map(function (key, index) {
                            if (key === "date") {
                                date = new Date(item[key])
                                console.log(date)
                                return (
                                    <td className="col-3r">
                                        <span>  {months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()} </span>
                                    </td>
                                );
                            }
                            else if (key === "") {

                            }

                            return (
                                <td className="col-3r">
                                    <span>  {formatter.format(item[key])} </span>
                                </td>
                            );
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