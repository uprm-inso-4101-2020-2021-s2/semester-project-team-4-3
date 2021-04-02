import React, { Component } from 'react';
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
    }
});

function SimpleDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.open)
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

        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
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

export default class SimpleDialogDemo extends Component {
    constructor(props) {
        super(props);
        this.handleClickOpen = this.handleClickOpen.bind(this);

        var start = new Date(props.info.start_time)
        var end = new Date(props.info.end_time)
        var total = this.calculateWorkHours(start, end);

        this.state = {
            open: false,
            newStartHour: start,
            newEndHour: end,
            totals: total,
            day: props.day,
            date: props.info.date
        };
    }

    componentDidUpdate(prevProps) {

        if (prevProps.info.date !== this.props.info.date) {
            console.log("updated date in dialog")

            var start = new Date(this.props.info.start_time)
            var end = new Date(this.props.info.end_time)
            var total = this.calculateWorkHours(start, end);

            this.setState({
                newStartHour: this.props.info.start_time,
                newEndHour: this.props.info.end_time,
                totals: total
            });
        }
    }

    handleClickOpen = () => {

        this.setState({
            open: !this.state.open
        })
    };

    handleClose = () => {
        var state = Boolean(false)
        this.setState({
            open: state
        });
        console.log(this.state.open)

        // props.editWorkDayHours(
        //     props.info.date,
        //     day,
        //     newStartHour.toISOString(),
        //     newEndHour.toISOString(),
        //     props.task,
        //     totals);
    };

    changeFirst = (hour) => {
        this.setState = ({
            newStartHour: hour
        })
        //setNewStartHour(hour);
    };

    changeSecond = (hour) => {
        this.setState = ({
            newEndHour: hour
        })
    };

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
        var context = this;
        console.log(this.state.open)
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    {this.state.totals}
                </Button>

                <SimpleDialog
                    key={this.state.open}
                    startHour={this.state.newStartHour}
                    endHour={this.state.newEndHour}
                    day={this.state.day}
                    open={this.state.open}
                    onClose={this.handleClose}
                    changeStart={this.changeFirst}
                    changeEnd={this.changeSecond} />
            </div>

        );
    }
}