import React, { Component } from 'react';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import '../App.css';
import MaterialUIPickers from '../components/calendarPicker';
import SimpleSelect from '../components/selectBox';
import Box from '@material-ui/core/Box';

export default class RequestsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            rTypes: ["vacation", "sick", "other"],
            headers: ["date", "type", "start_date", "end_date", "status"],
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

    async postRequest() {
        var requests = this.state.requests;
        var today = (new Date()).toISOString()
        var newRequest = {
            "date": today,
            "start_date": this.state.startDate.toISOString(),
            "end_date": this.state.endDate.toISOString(),
            "type": this.state.rType,
            "status": 0
        }
        requests.push(newRequest);
        axios.post('http://127.0.0.1:3001/Requests',
            newRequest,
            { headers: { 'Content-Type': 'application/json' } });
        this.setState({
            requests: requests
        });
    };

    setStartCalendarDate(date) {
        this.setState({
            startDate: date
        });
    }

    setEndCalendarDate(date) {
        this.setState({
            endDate: date
        });
    }

    updaterType(index) {
        this.setState({
            rType: this.state.rTypes[index]
        });
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

                <hr />

                <div className="addWorkContainer">

                    <span className="addWork" style={{ "marginTop": 20 }}> Add Work Task done: </span>
                    <Box component="div" style={{ "marginRight": 20, "marginTop": 20 }}>
                        <SimpleSelect
                            items={this.state.rTypes}
                            onSelectBoxItemChange={this.updaterType.bind(this)} />
                    </Box>

                    <MaterialUIPickers
                        calendarDate={this.state.startDate}
                        label="Select Start Date"
                        setCalendarDate={this.setStartCalendarDate.bind(this)} />

                    <MaterialUIPickers
                        calendarDate={this.state.endDate}
                        label="Select End Date"
                        setCalendarDate={this.setEndCalendarDate.bind(this)} />

                    <button
                        className="submitButton"
                        style={{ "marginLeft": 20, "marginTop": 20 }}
                        onClick={this.postRequest.bind(this)} >
                        Request
                    </button>
                </div>

            </div>
        );
    }
}