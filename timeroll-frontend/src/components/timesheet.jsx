import React, { Component } from 'react';
import MaterialUIPickers from './calendarPicker';
import TimeSheetTable from './timesheettable';
import '../App.css';

class Timesheet extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div id="body" className="body">
                    <div className="datepickers">
                        <MaterialUIPickers />
                    </div>
                    <TimeSheetTable />
                </div>
            </React.Fragment>
        );
    }
}

export default Timesheet;