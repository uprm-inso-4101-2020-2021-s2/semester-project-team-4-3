import React, { Component } from 'react';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import '../App.css';
import Checkbox from '@material-ui/core/Checkbox';

export default class AdminRequestsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            rTypes: ["vacation", "sick", "other"],
            headers: ["accept", "date", "type", "start_date", "end_date", "status"],
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
            requests: [],
            rType: ""
        }
    }

    componentDidMount() {
        this.getRequests();

    }

    async getRequests() {

        axios.get('http://127.0.0.1:3001/Requests')
            .then((response) => {
                var requests = [];
                for (var i in response.data) {
                    requests.push(response.data[i]);
                }

                this.setState({
                    requests: requests
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    async updateRequests(request) {
        var date = request["date"]
        axios.get('http://127.0.0.1:3001/Requests/' + date, request)
            .then((response) => {
                console.log("updated request");
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    handleChecked(index, checked) {
        var changeCheck = !checked;
        var requests = this.state.requests;

        requests[index]["status"] = changeCheck ? 1 : 0;
        this.updateRequests(requests[index]);
        this.setState({
            requests: requests
        })
    }


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
        var context = this;
        var checked = false;
        var date;
        return this.state.requests.map(function (item, index) {
            return (
                <tr key={"item-" + index} className="table-row">

                    {
                        headers.map(function (key, i) {
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
                            else if (key === "accept") {
                                checked = item["status"] === 1 ? true : false;
                                return (
                                    <td className="col-1r">
                                        <Checkbox
                                            checked={checked}
                                            onChange={context.handleChecked.bind(context, index, checked)}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </td>
                                )
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