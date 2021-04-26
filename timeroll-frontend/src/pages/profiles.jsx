import React, { Component } from 'react';
import SimpleSelect from '../components/selectBox';
import Box from '@material-ui/core/Box';
import axios from "axios";
import { TextField, Typography, Button, makeStyles } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../App.css';

class Profiles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            uType: props.uType,
            employees: [],
            deductions: ["SS", "Tax"],
            benefits: ["Medical", "Life insurance"],
            employeeInfo: {
                "uid": "",
                "name": "",
                "date": "",
                "uType": "",
                "salary": "",
                "deductions": [],
                "benefits": []
            },
            allEmployees: {}
        }
    }

    componentDidMount() {
        if (this.props.uType === "admin") {
            this.getAllEmployees();
        } else {
            this.getEmployee(this.props.username);
        }
    }

    async getAllEmployees() {

        await axios.get('http://127.0.0.1:3001/Employees')
            .then((response) => {
                // handle success
                console.log(response.data)
                var employees = [];
                for (var i in response.data) {
                    if (response.data[i]["name"] !== this.state.name) {
                        employees.push(response.data[i]["name"]);
                    }
                }
                console.log(employees)
                this.setState({
                    employees: employees,
                    allEmployees: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    async getEmployee(employee) {
        await axios.get('http://127.0.0.1:3001/Employees/' + employee)
            .then((response) => {
                // handle success
                console.log(response.data)
                this.setState({
                    employeeInfo: response.data
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

    compareAdmin() {
        if (this.state.uType === "admin") {
            return (
                <Box component="div" style={{ "margin": 20, "display": "flex", "flexDirection": "row" }}>
                    <SimpleSelect style={{ "margin": 20 }} items={this.state.employees} label="Employee" onSelectBoxItemChange={this.onSelectBoxItemChange.bind(this)} />
                    <button className="deleteButton" style={{ "marginLeft": 20, "marginTop": 10, "width": 110 }}>
                        Delete Employee
                    </button>
                    <button className="editButton" style={{ "marginLeft": 20, "marginTop": 10, "width": 110 }}>
                        Edit Employee
                    </button>
                </Box>
            );
        }
    }

    renderCreateEmployee() {
        if (this.state.uType === "admin") {
            return (
                <div className="createEmployeeContainer">
                    <div className="createEmployeeField">
                        <Typography className="pageTitle" variant="h4" gutterBottom>
                            Create New Employee
                        </Typography>

                        <button className="submitButton" style={{ "marginTop": 40, "marginLeft": 50 }}>
                            Create Employee
                            </button>
                    </div>
                    <Card className={this.useStyles.root}>
                        <CardContent style={{ "marginLeft": 50, "display": "flex", "flexDirection": "row" }}>
                            <div>
                                <Typography className={this.useStyles.title} color="textPrimary" gutterBottom>
                                    Employee Name
                                </Typography>
                                <TextField
                                    style={{ "margin": 20, "marginBottom": 10, "width": 350 }}
                                    label="Name"
                                    variant="outlined"
                                    className="form-input"
                                />

                                <Typography className={this.useStyles.title} color="textPrimary" gutterBottom>
                                    User name (email):
                                </Typography>
                                <TextField
                                    style={{ "margin": 20, "marginBottom": 10, "width": 350 }}
                                    label="Username"
                                    variant="outlined"
                                    className="form-input"
                                />

                                <div style={{ "marginTop": 15 }}>
                                    <Typography className={this.useStyles.pos} color="textPrimary">
                                        Salary:
                                </Typography>
                                    <TextField
                                        style={{ "margin": 20, "marginBottom": 10, "width": 200 }}
                                        label="Salary"
                                        variant="outlined"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div style={{ "marginLeft": 100 }}>
                                <div style={{ "marginTop": 15 }}>
                                    <Typography className={this.useStyles.pos} color="textPrimary">
                                        Deductions
                                </Typography>
                                    <SimpleSelect
                                        style={{ "margin": 20 }}
                                        items={this.state.deductions}
                                        label="Deductions"
                                    />
                                </div>

                                <div style={{ "marginTop": 15 }}>
                                    <Typography className={this.useStyles.pos} color="textPrimary">
                                        Benefits
                                </Typography>
                                    <SimpleSelect
                                        style={{ "margin": 20 }}
                                        items={this.state.benefits}
                                        label="Benefits"
                                    />
                                </div>
                            </div>

                        </CardContent>
                    </Card>

                </div>
            )
        }

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

    render() {
        var info = this.state.employeeInfo;

        return (
            <React.Fragment>
                <div className="body" >
                    <Typography className="pageTitle" variant="h4" gutterBottom>
                        Profile
                    </Typography>
                    {this.compareAdmin()}


                    <Card className={this.useStyles.root}>
                        <CardContent style={{ "marginLeft": 50 }}>
                            <Typography className={this.useStyles.title} color="textPrimary" gutterBottom>
                                Employee Information
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {info["name"]}
                            </Typography>

                            <div style={{ "marginTop": 15 }}>
                                <Typography className={this.useStyles.pos} color="textPrimary">
                                    Salary
                                </Typography>
                                <Typography style={{ "marginLeft": 20 }} variant="body2" component="p">
                                    {info["salary"]}
                                </Typography>
                            </div>

                            <div style={{ "marginTop": 15 }}>
                                <Typography className={this.useStyles.pos} color="textPrimary">
                                    Deductions
                                </Typography>
                                {(info["deductions"]).map((item, index) => {
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
                                {info["benefits"].map((item, index) => {
                                    return (
                                        <Typography style={{ "marginLeft": 20 }} variant="body2" component="p">
                                            { item["type"]}
                                        </Typography>
                                    )
                                })}
                            </div>

                        </CardContent>
                    </Card>

                    {this.renderCreateEmployee()}

                </div>
            </React.Fragment>
        );
    }
}

export default Profiles;