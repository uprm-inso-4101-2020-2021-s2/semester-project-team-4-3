import React, { Component } from 'react';
import TimePicker from './timepicker';
import axios from "axios";
import SimpleDialogDemo from './dialog'
import '../App.css';

export default class TimeSheetTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            items: [],
            timesheetTasks: {},
            counter: 0,
            start_hour: new Date(),
            end_hour: new Date(),
            totals: {
                "Monday": 0,
                "Tuesday": 0,
                "Wednesday": 0,
                "Thursday": 0,
                "Friday": 0,
                "Saturday": 0
            },
            weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months: ["January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"],
            workTypes: [
                { id: 'NONE', name: 'None' },
                { id: 'SECRT', name: 'Secretarial' },
                { id: 'LABTR', name: 'Laboratorio' },
                { id: 'FACTU', name: 'Facturacion' },
                { id: 'MUEST', name: 'Toma de Muestra' }
            ],
            weekDates: []
        }
    }

    componentDidMount() {
        var items = this.getTimesheet(this, "2021-03-15T18:49:38.754Z");

        console.log(this.state.timesheetTasks)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.calendarDate !== this.props.calendarDate) {
            this.renderHeader();
        }
    }

    async postWorkDay(workday) {

        const res = await axios.post("http://127.0.0.1:3001/workdays",
            workday,
            { headers: { 'Content-Type': 'application/json' } });
    };

    async getTimesheet(context, date) {

        const res = await axios.get('http://127.0.0.1:3001/Timesheet/' + date)
            .then(async (response) => {
                // handle success
                var tasks = context.formatTimesheetInfo(response.data)
                await context.setState({
                    timesheetTasks: tasks
                })

                console.log(context.state.timesheetTasks)
            })
    };

    getDaysOfTheWeek(selectedDate) {
        var dates = [];
        var tempDate;
        tempDate = this.setToMonday(selectedDate);

        for (var i = 0; i < 6; i++) {
            var nextDay = new Date(tempDate);
            nextDay.setDate(tempDate.getDate() + i);
            dates.push(nextDay);
        }
        return dates
    }

    renderHeader() {
        var dates = this.getDaysOfTheWeek(this.props.calendarDate);
        var weekDays = this.state.weekdays;
        var months = this.state.months;
        return (
            <tr className="table-header">
                <th className="col-2r">
                    <span> Work Task </span>

                </th>

                {dates.map(function (date, i) {
                    var formattedDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getYear()
                    return (
                        <th className="col-2r">
                            <span>{weekDays[i]} </span>
                            <span className="date"> {formattedDate} </span>
                        </th>
                    )
                })}

                <th className="col-2r">

                </th>
            </tr>
        );
    }

    tableStyle = {
        paddingLeft: 10,
        margin: 20,
        width: 800
    };

    updateMessage(event) {
        this.setState({
            message: event.target.value
        });

    }

    handleClick() {
        var items = this.state.items;

        items.push(this.state.message);

        this.setState({
            items: items
        });
    }

    handleItemChanged(i, event) {
        var items = this.state.items;

        items[i] = event.target.value;

        this.setState({
            items: items
        });
    }

    handleItemDelete(i) {
        var items = this.state.items;

        items.splice(i, 1);

        this.setState({
            items: items
        });
    }

    handleAddWork() {
        var counter = this.state.counter;
        var start = this.state.start_hour;
        var end = this.state.end_hour;
        var weekdays = this.state.weekdays;

        var today = weekdays[new Date().getDay()];

        var workType = this.state.message !== "" ? this.state.message : "NONE"

        var workEntry = {
            "type": workType,
            [today]: {
                "start_hour": start.toISOString(),
                "end_hour": end.toISOString()
            }
        };

        var items = this.state.items;

        items[counter] = workEntry;

        counter = counter + 1;

        this.setState({
            items: items,
            counter: counter,
            message: workType
        });

        var diff = this.calculateWorkHours(start, end);
        this.recalculateHours(today, diff, true);
    }

    calculateWorkHours(start, end) {
        var diff = (end.getTime() - start.getTime()) / 1000;
        diff /= (60 * 60);
        return Math.abs(diff);
    }

    calculateTotals(workday, hour, add) {
        var totals = this.state.totals;

        var total = 0;

        if (add === true) {
            totals[workday] = totals[workday] + hour;
        }
        else {
            totals[workday] = totals[workday] - hour;
        }
        this.setState({
            totals: totals
        });

        this.renderTotalRow();
    }

    recalculateHours(workday, hour, add) {
        var totals = this.state.totals;
        var hours;

        var total = 0;

        if (add === true) {
            totals[workday] = totals[workday] + hour;
        }
        else {
            totals[workday] = totals[workday] - hour;
        }
        this.setState({
            totals: totals
        });

        this.renderTotalRow();
    }

    submitWorkDay(context) {
        var start_hour = context.state.start_hour;
        var end_hour = context.state.end_hour;
        var type = context.state.message;
        var workday = {
            "start_hour": start_hour,
            "end_hour": end_hour,
            "type": type
        };

        context.postWorkDay(workday)
    }

    formatTimesheetInfo(timesheet) {
        var currentTaskList = {}
        var task = "";
        var worktype = "";
        var totalWorkHours = this.state.totals;
        for (const item in timesheet) {
            if (item != "date") {
                task = timesheet[item]["tasks"]

                for (const i in task) {

                    worktype = task[i]["worktype"]

                    if (!(worktype in currentTaskList)) {
                        currentTaskList[worktype] = {
                            "worktype": worktype,
                        }
                    }

                    currentTaskList[worktype][item] = {
                        "end_time": task[i]["end_time"],
                        "note": task[i]["note"],
                        "start_time": task[i]["start_time"]
                    };

                    totalWorkHours[item] += this.calculateWorkHours(
                        new Date(task[i]["start_time"]),
                        new Date(task[i]["end_time"]))

                }
            }
        }
        this.setState({
            totals: totalWorkHours
        })

        return currentTaskList
    }

    typeOfDay(context, day) {
        var weekdays = this.state.weekdays;
        if (day === weekdays[new Date().getDay()]) {
            return (
                <button onClick={context.submitWorkDay(context)}> Submit </button>
            );
        }
    }

    handleWorkHoursChanged(i, workday, event) {
        var items = this.state.items;
        var value = event.target.value;
        value = value.replace(/\D/g, "");

        items[i][workday] = value;

        this.recalculateHours(workday, items);
    }

    handleStartWorkHoursChanged(i, workday, event) {
        var items = this.state.items;
        var value = event.target.value;
        value = value.replace(/\D/g, "");

        items[i][workday]["start_hour"] = value;
    }

    handleEndWorkHoursChanged(i, workday, event) {
        var items = this.state.items;
        var value = event.target.value;
        value = value.replace(/\D/g, "");

        if (value)
            items[i][workday]["end_hour"] = value;
    }

    renderTotalRow() {
        var weekdays = this.state.weekdays;
        var totals = this.state.totals;
        return (
            <tr key={"item-5"} className="table-row">
                <td className="col-1r">
                    <span> totals </span>
                </td>

                {weekdays.map(function (day, i) {
                    return (
                        <td className="col-1r">
                            <span> {totals[day]} </span>
                        </td>
                    )
                })}
                <td className="col-1r">
                </td>
            </tr>
        );
    }

    changeFirst(hour) {
        this.setState({
            start_hour: hour,
        });
    }

    changeSecond(hour) {
        this.setState({
            end_hour: hour,
        });
    }

    setToMonday(date) {
        var tempDate = new Date(date);
        var day = tempDate.getDay() || 7;
        if (day !== 1)
            tempDate.setHours(-24 * (day - 1));
        return tempDate;
    }

    renderRows() {
        var context = this;
        var tableColumns = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Delete"];
        var totalWorkHours = this.state.totals;
        var tasks = context.state.timesheetTasks;
        console.log(tasks);
        return Object.keys(tasks).map(function (key, index) {
            return (
                <tr key={"item-" + key} className="table-row">
                    <td className="col-1r">
                        <span
                            type="text"
                            value={tasks[key]["worktype"]}
                        > {tasks[key]["worktype"]} </span>
                    </td>

                    {
                        tableColumns.map(function (day, index) {

                            if (Object.keys(tasks[key]).length !== 0) {
                                console.log(tasks[key][day]);
                                if (day !== "Delete" && tasks[key][day] !== undefined) {
                                    // if (tasks[key][day]["start_time"] !== undefined) {

                                    //     totalWorkHours[day] += context.calculateWorkHours(
                                    //         new Date(tasks[key][day]["start_time"]),
                                    //         new Date(tasks[key][day]["end_time"]))

                                    // }
                                    return (
                                        <td className="col-1r">
                                            <SimpleDialogDemo
                                                startHour={tasks[key][day]["start_time"]}
                                                endHour={tasks[key][day]["end_time"]}
                                                day={day} />
                                        </td>
                                    )
                                }
                                else if (day === "Delete") {
                                    return (<td className="col-1r">
                                        <button
                                            onClick={context.handleItemDelete.bind(context, index)}
                                            className="deleteButton"
                                        >
                                            Delete
                                        </button>
                                    </td>)
                                }
                                else {
                                    return (
                                        <td className="col-1r">
                                            <div >
                                                <span> - </span>

                                            </div>
                                        </td>);
                                }
                            }
                        })
                    }

                    {/* {
                        tableColumns.map(function (day, index) {

                            if (Object.keys(o).length !== 0) {
                                if (day !== "delete" && o[day] !== undefined) {
                                    if (o[day]["start_hour"] !== undefined) {
                                    }
                                    return (
                                        <td className="col-1r">
                                            <SimpleDialogDemo
                                                startHour={o[day]["start_hour"]}
                                                endHour={o[day]["end_hour"]}
                                                day={day} />
                                        </td>
                                    )
                                }
                                else if (day === "delete") {
                                    return (<td className="col-1r">
                                        <button
                                            onClick={context.handleItemDelete.bind(context, i)}
                                        >
                                            Delete
                                                    </button>
                                    </td>)
                                }
                                else {
                                    return (
                                        <td className="col-1r">
                                            <div >
                                                <span> - </span>

                                            </div>
                                        </td>);
                                }
                            }
                        })
                    } */}
                </tr>
            );
        }

        );
    }

    render() {

        let work = this.state.workTypes;
        var context = this;
        this.getDaysOfTheWeek(this.props.calendarDate);

        let optionItems = work.map((types) =>
            <option key={types.id}>{types.id}</option>
        );
        return (
            <div className="container">
                <div className="tableContainer">
                    <table className="responsive-table">
                        <thead>
                            {this.renderHeader()}
                        </thead>
                        <tbody>
                            {this.renderRows()}
                            {this.renderTotalRow()}
                        </tbody>
                    </table>
                </div>

                <hr />

                <span className="addWork"> Add Work Task done: </span>
                <select onChange={this.updateMessage.bind(this)}>
                    {optionItems}
                </select>

                <div className="addWorkContainer">

                    <TimePicker
                        hour={this.state.start_hour}
                        label="Select Start Hour"
                        changeDate={this.changeFirst.bind(this)} />
                    <TimePicker
                        hour={this.state.end_hour}
                        label="Select End Hour"
                        changeDate={this.changeSecond.bind(this)} />

                    <button className="submitButton" onClick={this.handleAddWork.bind(this)}>
                        Add
                    </button>
                </div>

            </div>
        );
    }
}