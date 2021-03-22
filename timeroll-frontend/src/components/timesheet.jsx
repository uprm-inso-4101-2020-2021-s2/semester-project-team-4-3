import React, { Component } from 'react';
import MaterialUIPickers from './calendarPicker';
import TimeSheetTable from './timesheettable';
import '../App.css';

class Timesheet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarDate: new Date()
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
                    <div className="datepickers">
                        <MaterialUIPickers calendarDate={this.state.calendarDate} setCalendarDate={this.setCalendarDate.bind(this)} />
                    </div>
                    <TimeSheetTable calendarDate={this.state.calendarDate} />
                </div>
            </React.Fragment>
        );
    }
}

export default Timesheet;