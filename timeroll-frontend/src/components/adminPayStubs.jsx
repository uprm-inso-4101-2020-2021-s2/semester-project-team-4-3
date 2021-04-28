import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MaterialUIPickers from './calendarPicker';
import SimpleSelect from './selectBox';
import Divider from '@material-ui/core/Divider';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import axios from "axios";
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

class AdminPayStubs extends Component {
    constructor(props) {
        super(props);

        var employeeNames = [];
        for (var i in props.employees) {
            employeeNames.push(props.employees[i]["name"]);
        }
        this.state = {
            headers: ["hours", "gross", "deductions", "benefits", "net"],
            employeeNames: employeeNames,
            allEmployees: [],
            index: 0,
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
            examplePayStub: {
                "hours": 40,
                "gross": 1794,
                "deductions": 100,
                "benefits": 50,
                "net": 1644
            },
            employeeInfo: {
                "name": "",
                "salary": "",
                "deductions": [],
                "benefits": []
            }
        }
    }

    componentDidMount() {

        this.getAllEmployees();

    }

    useStyles = makeStyles({
        root: {
            minWidth: 275,
            marginLeft: 40,
            marginTop: 20,
            padding: 40
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        content: {
            margin: 50,
            padding: 40
        }
    });

    async getAllEmployees() {

        await axios.get('http://127.0.0.1:3001/Employees')
            .then((response) => {
                // handle success

                var employees = [];
                for (var i in response.data) {
                    if (response.data[i]["name"] !== this.state.name) {
                        employees.push(response.data[i]["name"]);
                    }
                }

                this.setState({
                    employees: employees,
                    allEmployees: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    async getEmployee(email) {
        await axios.get('http://127.0.0.1:3001/Employees/' + email)
            .then((response) => {
                // handle success

                this.setState({
                    employeeInfo: response.data,
                    email: email
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    onSelectBoxItemChange(item) {
        var email = ""
        var name = this.state.employees[item]
        console.log(this.state.allEmployees)

        for (item in this.state.allEmployees) {
            console.log("item: ", item)
            if (this.state.allEmployees[item]["name"] === name) {
                email = this.state.allEmployees[item]["date"]
                break;
            }
        }

        this.getEmployee(email);
    }

    // onSelectBoxItemChange(item) {
    //     console.log(item);
    //     this.setState({
    //         index: item
    //     });
    // }


    setCalendarDate(date) {
        this.setState({
            calendarDate: date
        });
    }

    renderHeader() {

        return (
            <tr className="table-header">
                <th className="col-4r">
                    <span> Total Hours </span>
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


    renderEmployeePaystubRow() {
        var headers = this.state.headers;
        var item = this.state.examplePayStub;
        var date;
        var months = this.state.months;
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
        return (
            <div className="container">
                <div className="tableContainer">
                    <table className="responsive-table">
                        <thead>
                            {this.renderHeader()}
                        </thead>
                        <tbody>
                            <tr key={"item-1"} className="table-row">
                                {
                                    headers.map(function (key, index) {
                                        if (key === "hours") {
                                            return (
                                                <td className="col-3r">
                                                    <span>  {item[key]} </span>
                                                </td>
                                            );
                                        }
                                        else {
                                            return (
                                                <td className="col-3r">
                                                    <span>  {formatter.format(item[key])} </span>
                                                </td>
                                            );
                                        }
                                    }
                                    )
                                }

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    renderEmployeeInfo() {
        var employeeInfo = this.state.employeeInfo;
        return (
            <Card className={this.useStyles.root}>
                <CardContent style={{ "marginLeft": 50 }}>
                    <Typography className={this.useStyles.title} color="textPrimary" gutterBottom>
                        Employee Information
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {employeeInfo["name"]}
                    </Typography>

                    <div style={{ "marginTop": 15 }}>
                        <Typography className={this.useStyles.pos} color="textPrimary">
                            Salary
                        </Typography>
                        <Typography style={{ "marginLeft": 20 }} variant="body2" component="p">
                            {employeeInfo["salary"]}
                        </Typography>
                    </div>

                    <div style={{ "marginTop": 15 }}>
                        <Typography className={this.useStyles.pos} color="textPrimary">
                            Deductions
                        </Typography>
                        {employeeInfo["deductions"].map((item, index) => {
                            return (
                                <Typography style={{ "marginLeft": 20 }} variant="body2" component="p">
                                    { item["type"]}
                                </Typography>
                            )
                        })}
                    </div>

                    <div style={{ "marginTop": 15 }}>
                        <Typography className={this.useStyles.pos} color="textPrimary">
                            Benefits
                        </Typography>
                        {employeeInfo["benefits"].map((item, index) => {
                            return (
                                <Typography style={{ "marginLeft": 20 }} variant="body2" component="p">
                                    { item["type"]}
                                </Typography>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>


        )
    }

    render() {
        return (
            <React.Fragment>
                <div className="body" >
                    <div className="datepickers">
                        <Box component="div" style={{ "margin": 10, "display": "flex", "flexDirection": "row" }}>
                            <Typography variant="h6" noWrap style={{ "marginTop": 20, "marginRight": 10 }}>
                                Select an employee:
                            </Typography>
                            <SimpleSelect
                                style={{ "margin": 10 }}
                                items={this.state.employeeNames}
                                label="Employee"
                                defaultValue={this.state.employeeNames[0]}
                                onSelectBoxItemChange={this.onSelectBoxItemChange.bind(this)} />
                        </Box>
                        <MaterialUIPickers calendarDate={this.state.calendarDate} setCalendarDate={this.setCalendarDate.bind(this)} />

                        <button className="submitButton" style={{ "marginTop": 20, "marginLeft": 50 }}>
                            Generate Paystubs
                        </button>

                    </div>
                    {this.renderEmployeePaystubRow()}
                    <Divider variant="middle" />
                    {this.renderEmployeeInfo()}
                </div>
            </React.Fragment>
        );
    }
}

export default AdminPayStubs;