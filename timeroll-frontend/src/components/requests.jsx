import React, { Component } from 'react';
import MaterialUIPickers from './calendarPicker';
import RequestsTable from './requestsTable';
import SimpleSelect from './selectBox';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import '../App.css';

class Requests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarDate: new Date(),
            name: props.name,
            uType: props.uType,
            employees: []
        }

        console.log(props)
    }

    componentDidMount() {
        if (this.props.uType === "admin") {
            this.getAllEmployees();
        }
    }

    async getAllEmployees() {

        await axios.get('http://127.0.0.1:3001/Employees')
            .then((response) => {
                // handle success
                console.log(response.data)
                var employees = [];
                for (var i in response.data) {
                    employees.push(response.data[i]["name"]);
                }
                console.log(employees)
                this.setState({
                    employees: employees
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    onSelectBoxItemChange(item) {
        this.setState({
            name: this.state.employees[item]
        });
    }

    setCalendarDate(date) {
        this.setState({
            calendarDate: date
        });
    }

    getCalendarDate() {
        return this.state.calendarDate;
    }

    compareAdmin() {
        if (this.state.uType === "admin") {
            return (
                <Box component="div" style={{ "margin": 20 }}>
                    <SimpleSelect style={{ "margin": 20 }} items={this.state.employees} label="Employee" onSelectBoxItemChange={this.onSelectBoxItemChange.bind(this)} />
                </Box>
            );
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="body" >
                    <Typography className="pageTitle" variant="h4" gutterBottom>
                        Requests
                    </Typography>
                    <div className="datepickers">
                        {this.compareAdmin()}
                    </div>
                    <RequestsTable user={this.state.name} calendarDate={this.state.calendarDate} />
                </div>
            </React.Fragment>
        );
    }
}

export default Requests;