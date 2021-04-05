import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import PayStubsTable from './payStubsTable';
import Typography from '@material-ui/core/Typography';
import '../App.css';

class PayStubs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarDate: new Date(),
            user: "",
            uType: ""
        }
    }

    setCalendarDate(date) {
        this.setState({
            calendarDate: date
        });
    }

    getCalendarDate() {
        return this.state.calendarDate;
    }

    render() {
        return (
            <React.Fragment>
                <div className="body" >
                    <Typography className="pageTitle" variant="h4" gutterBottom>
                        Paystubs
                     </Typography>
                    <PayStubsTable />

                </div>
            </React.Fragment>
        );
    }
}

export default PayStubs;