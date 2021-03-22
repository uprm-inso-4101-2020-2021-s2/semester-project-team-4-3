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
    const { startHour, endHour, day, open, onClose } = props;

    const [newStartHour, setNewStartHour] = React.useState(props.startHour);
    const [newEndHour, setNewEndHour] = React.useState(props.endHour);

    const handleClose = () => {
        onClose();
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
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title"> {day} worked hours </DialogTitle>

            <div className={classes.timeContainers}>
                <TimePicker className={classes.timePickers} label="Start Hour"
                    hour={newStartHour}
                    changeDate={changeStart} />

                <TimePicker className={classes.timePickers} label="Start Hour"
                    hour={newEndHour}
                    changeDate={changeEnd} />

                <div className="wrap">
                    <button className="submitButton" onClick={handleClose}> Submit </button>
                </div>
            </div>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
    const [open, setOpen] = React.useState(false);
    const { startHour, endHour, day } = props;

    const [newStartHour, setNewStartHour] = React.useState(new Date(props.startHour));
    const [newEndHour, setNewEndHour] = React.useState(new Date(props.endHour));

    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        // setSelectedValue(value);
    };

    const changeFirst = (hour) => {
        setNewStartHour(hour);
    };

    const changeSecond = (hour) => {
        setNewEndHour(hour);
    };

    const getFormattedTime = (time) => {
        let result = time.match(/\d\d:\d\d/);
        return result
    }

    const calculateWorkHours = (start, end) => {
        var diff = (newEndHour.getTime() - newStartHour.getTime()) / 1000;
        diff /= (60 * 60);

        return Math.abs(diff).toFixed(2);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {calculateWorkHours(newStartHour, newEndHour)}
            </Button>
            <SimpleDialog
                startHour={newStartHour}
                endHour={newEndHour}
                day={day}
                open={open}
                onClose={handleClose}
                changeStart={changeFirst}
                changeEnd={changeSecond} />
        </div>
    );
}