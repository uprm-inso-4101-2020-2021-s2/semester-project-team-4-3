import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

import { createStyles } from "@material-ui/styles";

import { IconButton, makeStyles, withStyles } from "@material-ui/core";

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    timeInput: {
        marginTop: 30,
        marginLeft: 40,
        minWidth: 200,
    }
}));

export default function MaterialUIPickers(props) {
    const styles = useStyles()
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(props.calendarDate);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        props.setCalendarDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <KeyboardDatePicker
                className={styles.timeInput}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Timesheet Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />


        </MuiPickersUtilsProvider>
    );
}