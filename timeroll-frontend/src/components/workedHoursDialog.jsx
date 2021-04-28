import React, { Component, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TimePicker from './timepicker';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import '../App.css';

import { blue } from '@material-ui/core/colors';

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
    },
    text: {
        padding: 10,
        marginTop: 10
    }
});

function SimpleDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open)
    const [newStartHour, setNewStartHour] = React.useState(props.startHour);
    const [newEndHour, setNewEndHour] = React.useState(props.endHour);
    const [note, setNote] = React.useState(props.note);

    const handleClose = (submit) => {
        console.log(note);
        props.handleTextFieldChange(note);
        props.onClose(submit, newStartHour, newEndHour);
    };

    const changeStart = (hour) => {
        setNewStartHour(hour);
        console.log("change start hour: " + hour)
        props.changeStart(hour);
    };

    const changeEnd = (hour) => {
        // setNewEndHour(String(hour.getHours() + ":" + hour.getMinutes()));
        setNewEndHour(hour);
        console.log("change end hour: " + hour)
        props.changeEnd(hour);
    };

    const handleTextFieldChange = (e) => {
        setNote(e.target.value);
        props.handleTextFieldChange(e.target.value);
    }

    return (

        <Dialog onClose={() => handleClose(false)} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title"> {props.day} worked hours </DialogTitle>

            <div className={classes.timeContainers}>
                <TimePicker className={classes.timePickers} label="Start Hour"
                    hour={newStartHour}
                    changeDate={changeStart} />

                <TimePicker className={classes.timePickers} label="End Hour"
                    hour={newEndHour}
                    changeDate={changeEnd} />

                <TextField
                    value={note}
                    onChange={handleTextFieldChange}
                    className={classes.text}
                    id="outlined-multiline-static"
                    label="Note"
                    multiline
                    placeholder="Write a Note to express hour change"
                    rows={5}
                    variant="outlined"
                />

                <div className="wrap">
                    <button className="submitButton" onClick={() => handleClose(true)}> Submit </button>
                    <button className="deleteButton" onClick={() => handleClose(false)}> Close </button>
                </div>
            </div>
        </Dialog>
    );
}

export default class SimpleDialogDemo extends Component {
    constructor(props) {
        super(props);
        this.handleClickOpen = this.handleClickOpen.bind(this);

        var start = new Date(props.info.start_time)
        var end = new Date(props.info.end_time)
        var total = this.calculateWorkHours(start, end);

        if (start.getFullYear() === 1969) {
            start = NaN
            end = NaN
        }

        // console.log(start.getFullYear())

        this.state = {
            open: false,
            newStartHour: start,
            newEndHour: end,
            oldTotal: total,
            totals: total,
            day: props.day,
            date: props.info.date,
            note: props.info.note
        };
    }

    componentDidUpdate(prevProps) {

        if (prevProps.info.date !== this.props.info.date) {
            console.log("updated date in dialog")

            var start = new Date(this.props.info.start_time)
            var end = new Date(this.props.info.end_time)

            var total = this.calculateWorkHours(start, end);


            if (start.getFullYear() === 1969) {
                this.setState({
                    newStartHour: NaN,
                    newEndHour: NaN,
                    totals: total
                });
            }
            else {
                this.setState({
                    newStartHour: this.props.info.start_time,
                    newEndHour: this.props.info.end_time,
                    totals: total
                });
            }

        }
    }

    handleClickOpen = () => {

        this.setState({
            open: !this.state.open
        })
    };

    handleClose = (submit, start, end) => {
        var total = this.calculateWorkHours(start, end)
        console.log("total: " + total)

        if (submit) {
            this.props.editWorkDayHours(
                this.props.info.date,
                this.props.note,
                this.props.day,
                start,
                end,
                this.props.task,
                total,
                this.state.oldTotal);
        }
        var state = Boolean(false)
        this.setState({
            open: state,
            totals: total
        });
    };

    changeFirst = (hour) => {
        this.setState({
            newStartHour: hour
        })
    };

    changeSecond = (hour) => {
        this.setState({
            newEndHour: hour
        })
    };

    handleTextFieldChange = (text) => {
        this.setState({
            note: text
        })
    }

    calculateWorkHours = (start, end) => {
        if (isNaN(start.getTime())) {
            return "-"
        }
        var diff = (end.getTime() - start.getTime()) / 1000;
        diff /= (60 * 60);

        var total = Math.abs(diff).toFixed(2)

        return total;
    };

    render() {

        return (
            <div>
                <Button key={this.state.totals}
                    variant="outlined"
                    color={this.state.totals === "0.00" || this.state.totals === NaN || this.state.totals === "-"
                        ? "secondary" : "primary"}
                    onClick={this.handleClickOpen}>
                    {this.state.totals}
                </Button>

                <SimpleDialog
                    key={this.state.open}
                    startHour={this.state.newStartHour}
                    endHour={this.state.newEndHour}
                    day={this.state.day}
                    open={this.state.open}
                    note={this.state.note}
                    onClose={this.handleClose}
                    changeStart={this.changeFirst}
                    changeEnd={this.changeSecond}
                    handleTextFieldChange={this.handleTextFieldChange} />
            </div>

        );
    }
}