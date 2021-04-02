import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TimePicker from './timepicker';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import '../App.css';

import { blue } from '@material-ui/core/colors';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    timePickers: {
        width: 100,
        padding: 50,
        margin: 50
    },
    timeContainers: {
        padding: 10,
        margin: 10,
        display: "flex",
        flexDirection: "column"
    }
});

function SimpleDialog(props) {
    const classes = useStyles();

    const [newStartHour, setNewStartHour] = React.useState(props.startHour);
    const [newEndHour, setNewEndHour] = React.useState(props.endHour);

    const handleClose = () => {
        props.onClose();
    };

    const changeStart = (hour) => {
        setNewStartHour(String(hour.getHours() + ":" + hour.getMinutes()));
        props.changeStart(hour);
    };

    const changeEnd = (hour) => {
        setNewEndHour(String(hour.getHours() + ":" + hour.getMinutes()));
        props.changeEnd(hour);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="simple-dialog-title"> {props.day} worked hours </DialogTitle>

            <div className={classes.timeContainers}>
                <TimePicker className={classes.timePickers} label="Start Hour"
                    hour={newStartHour}
                    changeDate={changeStart} />

                <TimePicker className={classes.timePickers} label="Start Hour"
                    hour={newEndHour}
                    changeDate={changeEnd} />

                <div className="wrap">
                    <button className="submitButton" onClick={() => handleClose}> Submit </button>
                </div>
            </div>
        </Dialog>
    );
}

const SimpleDialogDemo = (props) => {
    const [open, setOpen] = React.useState(Boolean(!!props.variant));
    const day = props.day;
    console.log(props.info.end_time)

    const [newStartHour, setNewStartHour] = React.useState(new Date(props.info.start_time));
    const [newEndHour, setNewEndHour] = React.useState(new Date(props.info.end_time));
    const [totals, setTotals] = React.useState(props.total);

    // const [newStartHour, setNewStartHour] = React.useState(new Date(props.info.start_time));
    // const [newEndHour, setNewEndHour] = React.useState(new Date(props.info.end_time));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // props.editWorkDayHours(
        //     props.info.date,
        //     day,
        //     newStartHour.toISOString(),
        //     newEndHour.toISOString(),
        //     props.task,
        //     totals);
    };

    const changeFirst = (hour) => {
        setNewStartHour(hour);
    };

    const changeSecond = (hour) => {
        setNewEndHour(hour);
    };

    const calculateWorkHours = (start, end) => {
        if (isNaN(start.getTime())) {
            return "-"
        }
        var diff = (end.getTime() - start.getTime()) / 1000;
        diff /= (60 * 60);

        setTotals(Math.abs(diff).toFixed(2));

        return Math.abs(diff).toFixed(2);
    };

    return (

        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {calculateWorkHours(newStartHour, newEndHour)}
            </Button>
            {/* <SimpleDialog
                startHour={newStartHour}
                endHour={newEndHour}
                day={day}
                open={open}
                onClose={() => handleClose}
                changeStart={() => changeFirst}
                changeEnd={() => changeSecond} /> */}
        </div>

    );
}

export default React.memo(SimpleDialogDemo);