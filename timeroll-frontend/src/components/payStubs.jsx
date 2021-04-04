import React, { Component } from 'react';
import MaterialUIPickers from './calendarPicker';
import TimeSheetTable from './timesheettable';
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
                    <span> Paystubs </span>
                    <div className="datepickers">
                        <MaterialUIPickers calendarDate={this.state.calendarDate} setCalendarDate={this.setCalendarDate.bind(this)} />
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default PayStubs;