import React, { Component } from 'react';
import SimpleSelect from '../components/selectBox';
import Box from '@material-ui/core/Box';
import axios from "axios";
import { TextField, Typography, Button, makeStyles } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SelectBoxMultiple from '../components/selectBoxMultiple';
import '../App.css';

class Profiles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            uType: props.uType,
            email: "",
            selectedDeductions: [],
            selectedBenefits: [],
            newName: '',
            newSalary: '',
            newUsername: '',
            newPassword: '',
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
            employees: [],
            allEmployees: []
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

    async addEmployee(employee) {
        await axios.post('http://127.0.0.1:3001/Employees', employee)
            .then((response) => {
                // handle success
                console.log("added Employee")
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    async deleteEmployee() {
        var employees = this.state.employees;
        await axios.delete('http://127.0.0.1:3001/Employees/' + this.state.email)
            .then((response) => {
                // handle success
                console.log("deleted Employee: " + this.state.email)
                this.getAllEmployees();
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    createNewEmployee() {
        var allEmployees = this.state.allEmployees;
        var employeeNames = this.state.employees;
        var selectedBenefits = this.state.selectedBenefits;
        var selectedDeductions = this.state.selectedDeductions;
        var deductions = []
        var benefits = []

        if (selectedDeductions.length !== 0) {
            selectedDeductions.map(function (item, i) {
                // console.log("item: " + item + " , i: " + i)
                deductions.push({
                    "type": item
                })
            })
        }
        if (selectedBenefits.length !== 0) {
            selectedBenefits.map(function (item, i) {
                // console.log("item: " + item + " , i: " + i)
                benefits.push({
                    "type": item
                })
            })
        }
        var employee = {
            "name": this.state.newName,
            "date": this.state.newUsername,
            "password": this.state.newPassword,
            "uType": "user",
            "salary": this.state.newSalary,
            "deductions": deductions,
            "benefits": benefits
        }
        allEmployees.push(employee);
        employeeNames.push(this.state.newName);
        this.addEmployee(employee);

        this.setState({
            employees: employeeNames,
            allEmployees: allEmployees,
            newName: "",
            newUsername: "",
            newPassword: "",
            newSalary: ""
        })
    }

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

    updateSelections(selectionType, selections) {
        console.log(selectionType)
        this.setState({
            [selectionType]: selections
        });
    }

    handleInputChange(e) {
        console.log(e.target.getAttribute('name') + ": " + e.target.value)
        this.setState({
            [e.target.getAttribute('name')]: e.target.value
        })
    }

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
                    <button
                        className="deleteButton"
                        style={{ "marginLeft": 20, "marginTop": 10, "width": 110 }}
                        onClick={this.deleteEmployee.bind(this)}>
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

                        <button
                            className="submitButton"
                            style={{ "marginTop": 40, "marginLeft": 50 }}
                            onClick={this.createNewEmployee.bind(this)}>

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
                                    name="newName"
                                    onChange={e => (this.handleInputChange(e))}
                                />

                                <Typography className={this.useStyles.title} color="textPrimary" gutterBottom>
                                    User name (email):
                                </Typography>
                                <TextField
                                    style={{ "margin": 20, "marginBottom": 10, "width": 350 }}
                                    label="Username"
                                    variant="outlined"
                                    className="form-input"
                                    name="newUsername"
                                    onChange={e => (this.handleInputChange(e))}
                                />
                                <div style={{ "marginTop": 15 }}>
                                    <Typography className={this.useStyles.pos} color="textPrimary">
                                        Password:
                                    </Typography>
                                    <TextField
                                        style={{ "margin": 20, "marginBottom": 10, "width": 200 }}
                                        label="Password"
                                        variant="outlined"
                                        className="form-input"
                                        name="newPassword"
                                        onChange={e => (this.handleInputChange(e))}
                                    />
                                </div>


                            </div>

                            <div style={{ "marginLeft": 100 }}>
                                <div style={{ "marginTop": 15 }}>
                                    <Typography className={this.useStyles.pos} color="textPrimary">
                                        Salary:
                                    </Typography>
                                    <TextField
                                        style={{ "margin": 20, "marginBottom": 10, "width": 200 }}
                                        label="Salary"
                                        variant="outlined"
                                        className="form-input"
                                        name="newSalary"
                                        onChange={e => (this.handleInputChange(e))}
                                    />
                                </div>

                                <div style={{ "marginTop": 15 }}>
                                    <Typography className={this.useStyles.pos} color="textPrimary">
                                        Deductions
                                </Typography>
                                    <SelectBoxMultiple
                                        style={{ "margin": 20 }}
                                        options={this.state.deductions}
                                        label="Deductions"
                                        variable="selectedDeductions"
                                        updateSelections={this.updateSelections.bind(this)}
                                    />
                                </div>

                                <div style={{ "marginTop": 15 }}>
                                    <Typography className={this.useStyles.pos} color="textPrimary">
                                        Benefits
                                </Typography>
                                    <SelectBoxMultiple
                                        style={{ "margin": 20 }}
                                        options={this.state.benefits}
                                        label="Benefits"
                                        variable="selectedBenefits"
                                        updateSelections={this.updateSelections.bind(this)}
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