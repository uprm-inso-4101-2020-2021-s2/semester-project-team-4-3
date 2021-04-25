import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PayStubsTable from '../components/payStubsTable';
import Typography from '@material-ui/core/Typography';
import AdminPayStubs from '../components/adminPayStubs';
import { Link, Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import '../App.css';
import AdminPayStubsTable from '../components/adminPayStubsTable';

class PayStubs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarDate: new Date(),
            name: props.name,
            uType: props.uType,
            tab: 0,
            employees: []
        }
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
                this.setState({
                    employees: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    styles = theme => ({
        root: {
            backgroundColor: theme.palette.background.paper,
            width: 500
        }
    });

    handleTabChange = (event, tab) => {
        this.setState({ tab });
    };

    getCalendarDate() {
        return this.state.calendarDate;
    }

    setCalendarDate(date) {
        this.setState({
            calendarDate: date
        });
    }

    renderRoleView() {
        console.log(this.state.uType)
        if (this.state.uType === "admin") {
            console.log("isAdmin")
            return (
                <BrowserRouter>
                    <div className={this.styles.root}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={this.state.tab}
                                onChange={this.handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                fullWidth
                            >
                                <Tab label="Create Paystubs" component={Link} to="/paystubs/one" />
                                <Tab label="View Employee Paystubs" component={Link} to="/paystubs/two" />
                            </Tabs>
                        </AppBar>
                        <Switch>
                            <Route path="/paystubs/one" render={() => (
                                <AdminPayStubs employees={this.state.employees} isAuthed={true} />
                            )} />
                            <Route path="/paystubs/two" render={() => (
                                <AdminPayStubsTable employees={this.state.employees} isAuthed={true} />
                            )} />
                        </Switch>
                    </div>
                </BrowserRouter>
            )
        }
        else {
            return <PayStubsTable />
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="body" >
                    <Typography className="pageTitle" variant="h4" gutterBottom>
                        Paystubs
                    </Typography>
                    {this.renderRoleView()}

                </div>
            </React.Fragment>
        );
    }
}

export default PayStubs;