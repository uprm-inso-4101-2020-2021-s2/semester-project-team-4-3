import React, { Component } from 'react';
import TimePicker from './timepicker';
import axios from "axios";
import SimpleDialogDemo from './workedHoursDialog'
import SimpleSelect from './selectBox';
import Box from '@material-ui/core/Box';
import '../App.css';

export default class TimeSheetTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
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
            weekdates: []
        }
    }

    componentDidMount() {
        this.props.calendarDate.setHours(0)
        this.props.calendarDate.setMinutes(0)
        this.props.calendarDate.setSeconds(0)

        var tempDate = this.setToMonday(this.props.calendarDate)
        console.log(tempDate)

        this.getTimesheet(this, tempDate.toISOString())
    }

    componentDidUpdate(prevProps) {

        if (prevProps.calendarDate !== this.props.calendarDate) {
            console.log("updated calendar date")
            this.props.calendarDate.setHours(0)
            this.props.calendarDate.setMinutes(0)
            this.props.calendarDate.setSeconds(0)

            var tempDate = this.setToMonday(this.props.calendarDate)

            this.getTimesheet(this, tempDate.toISOString())
        }
        else if (prevProps.user !== this.props.user) {
            // get timesheet corresponding to selected user
            console.log("changed user to: " + this.props.user)
        }
    }

    async postWorkDay(workday) {

        const res = await axios.post("http://127.0.0.1:3001/workdays",
            workday,
            { headers: { 'Content-Type': 'application/json' } });
    };

    async postTimesheetWorkDay(workday, date) {
        var newEntry = {}
        axios.get('http://127.0.0.1:3001/Timesheet/' + date)
            .then((response) => {
                // handle success
                console.log("going into formatting timesheet")
                newEntry = response.data;

                Object.keys(newEntry).map(function (item, index) {
                    if (item !== "date") {
                        newEntry[item]["tasks"].push(workday[item]["tasks"][0]);
                    }
                })

                axios.put('http://127.0.0.1:3001/Timesheet/' + date, newEntry)
                    .then(resp => {

                        console.log("updated timesheet");
                    }).catch(error => {

                        console.log(error);
                    });

            })
            .catch(function (error) {
                console.log(error);
                axios.post("http://127.0.0.1:3001/Timesheet",
                    workday,
                    { headers: { 'Content-Type': 'application/json' } })
                    .then(() => {
                        console.log("posted timesheet entry");
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            })

    };

    async deleteTimesheetTask(task, date) {
        var taskList = this.state.timesheetTasks;
        delete taskList[task];

        var formattedDate = new Date(date);
        formattedDate.setHours(0)
        formattedDate.setMinutes(0)
        formattedDate.setSeconds(0)
        formattedDate.setMilliseconds(0)

        console.log(date)

        var empty = 0;
        var newEntry = {};
        axios.get('http://127.0.0.1:3001/Timesheet/' + formattedDate.toISOString())
            .then((response) => {
                // handle success
                console.log("going into formatting timesheet")
                newEntry = response.data;

                Object.keys(newEntry).map(function (item, index) {
                    if (item !== "date") {
                        Object.keys(newEntry[item]["tasks"]).map(function (taskInList, i) {

                            if (newEntry[item]["tasks"][taskInList]["worktype"] === task) {
                                console.log("hit")
                                newEntry[item]["tasks"].splice(i, 1);
                            }
                        })

                        if (newEntry[item]["tasks"].length === 0) {
                            empty += 1;
                        }
                    }
                })

                console.log(empty)
                if (empty === Object.keys(newEntry).length) {
                    axios.delete('http://127.0.0.1:3001/Timesheet/' + formattedDate.toISOString())
                        .then(resp => {

                            console.log("deleted timesheet");
                        }).catch(error => {

                            console.log(error);
                        });
                }
                else {
                    axios.put('http://127.0.0.1:3001/Timesheet/' + formattedDate.toISOString(), newEntry)
                        .then(resp => {

                            console.log("updated timesheet");
                        }).catch(error => {

                            console.log(error);
                        });
                }
            })
            .catch(function (error) {
                console.log(error);
            })

        this.setState({
            timesheetTasks: taskList
        })
    };

    async getTimesheet(context, date) {

        axios.get('http://127.0.0.1:3001/Timesheet/' + date)
            .then((response) => {
                // handle success
                console.log("going into formatting timesheet")
                context.formatTimesheetInfo(response.data)
            })
            .catch(function (error) {
                console.log(error);
                context.eraseTimesheet(date);
            })
    };

    async updateTimesheet(newWorkday, date) {
        axios.put('http://127.0.0.1:3001/workdays/' + date, newWorkday)
            .then(resp => {

                console.log("updated workday");
            }).catch(error => {

                console.log(error);
            });
    }

    async updateTimesheetEntry(task, date, day) {
        var newEntry = {};
        axios.get('http://127.0.0.1:3001/Timesheet/' + date)
            .then((response) => {
                // handle success
                console.log("going into formatting timesheet")
                newEntry = response.data;
                (newEntry[day]["tasks"]).map((taskItem, index) => {
                    if (taskItem["worktype"] === task["worktype"]) {
                        newEntry[day]["tasks"][index] = task;
                    }
                });

                axios.put('http://127.0.0.1:3001/Timesheet/' + date, newEntry)
                    .then(resp => {

                        console.log("updated workday");
                    }).catch(error => {

                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getDaysOfTheWeek(selectedDate) {
        var dates = [];
        var tempDate;
        tempDate = this.setToMonday(selectedDate);

        for (var i = 0; i < 6; i++) {
            var nextDay = new Date(tempDate);
            nextDay.setDate(tempDate.getDate() + i);
            dates.push(nextDay)
            //   dates.push(nextDay.getFullYear() + "-" + (nextDay.getMonth() + 1) + "-" + nextDay.getDay());
        }
        return dates
    }

    eraseTimesheet(date) {
        if (date !== this.state.weekdates[0]) {
            var totals = this.state.totals;
            var dates = this.getDaysOfTheWeek(new Date(date));
            Object.keys(totals).map((entry, index) => {
                totals[entry] = 0
            })

            this.setState({
                totals: totals,
                timesheetTasks: {},
                weekdates: dates
            })
        }
    }

    renderHeader() {
        var dates = this.getDaysOfTheWeek(this.props.calendarDate);
        var weekDays = this.state.weekdays;
        var months = this.state.months;
        var formattedDate;

        return (
            <tr className="table-header">
                <th className="col-2r">
                    <span> Work Task </span>

                </th>

                {dates.map(function (date, i) {

                    formattedDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()

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

    updateTask(index) {

        this.setState({
            message: this.state.workTypes[index].id
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
        this.recalculateHours(today, diff, 0);
    }

    handleAddWork2() {
        var weekdays = this.state.weekdays;
        var date = this.setToMonday(new Date());
        var stringDate = "";
        var newTaskWeek = {};
        var workType = this.state.message !== "" ? this.state.message : "NONE"
        var timesheet = this.state.timesheetTasks;

        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)

        stringDate = date.toISOString()
        var Monday = stringDate;
        newTaskWeek["date"] = stringDate

        weekdays.map(function (item, index) {
            newTaskWeek[item] = {
                "date": stringDate,
                "vacation": "false",
                "wid": "1",
                "tasks": [
                    {
                        "end_time": "",
                        "note": "",
                        "start_time": "",
                        "worktype": workType
                    }
                ]
            }

            date.setDate(date.getDate() + 1);

            stringDate = date.toISOString();

        })

        console.log(workType)

        timesheet[workType] = {
            "worktype": workType
        };

        console.log(timesheet)

        this.setState({
            timesheetTasks: timesheet
        });

        this.postTimesheetWorkDay(newTaskWeek, Monday);
    }

    calculateWorkHours(start, end) {
        var diff = (end.getTime() - start.getTime()) / 1000;
        diff /= (60 * 60);
        return Math.abs(diff);
    }

    recalculateHours(workday, hour, oldHour) {
        var totals = this.state.totals;

        if (typeof (oldHour) === 'string') {
            oldHour = 0
        }

        totals[workday] = (totals[workday] - oldHour) + hour;
        console.log(totals[workday]);

        (totals[workday]).toFixed(2);

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
        var date;
        var totalWorkHours = {};
        var weekdates = [];
        for (const item in timesheet) {
            if (item != "date") {
                task = timesheet[item]["tasks"]
                date = new Date(timesheet[item]["date"])

                date.setHours(0)
                date.setMinutes(0)
                date.setSeconds(0)
                date.setMilliseconds(0)

                weekdates.push(timesheet[item]["date"])

                for (const i in task) {

                    worktype = task[i]["worktype"]

                    if (!(worktype in currentTaskList)) {
                        currentTaskList[worktype] = {
                            "worktype": worktype,
                        }
                    }

                    currentTaskList[worktype][item] = {
                        "date": date.toISOString(),
                        "end_time": task[i]["end_time"],
                        "note": task[i]["note"],
                        "start_time": task[i]["start_time"]
                    };

                    // console.log(totalWorkHours[item])

                    if (task[i]["start_time"] === "" || task[i]["end_time"] === "") {
                        if (totalWorkHours[item] === undefined) {
                            totalWorkHours[item] = 0
                        }
                        else {
                            totalWorkHours[item] += 0
                        }
                    }
                    else {
                        if (totalWorkHours[item] === undefined) {
                            totalWorkHours[item] = this.calculateWorkHours(
                                new Date(task[i]["start_time"]),
                                new Date(task[i]["end_time"]))
                        }
                        else {
                            totalWorkHours[item] += this.calculateWorkHours(
                                new Date(task[i]["start_time"]),
                                new Date(task[i]["end_time"]))
                        }
                    }
                }
            }
        }
        console.log(totalWorkHours)
        this.setState({
            totals: totalWorkHours,
            timesheetTasks: currentTaskList,
            weekdates: weekdates
        })

        //return currentTaskList
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

    formatISOString(day) {
        var temp = new Date(day);
        temp.setSeconds(0);
        temp.setHours(0);
        temp.setMinutes(0);
        temp.setMilliseconds(0);
        return temp;
    }

    editWorkDayHours(date, note, weekday, startTime, endTime, type, newTotal, oldWorkHourTotal) {
        //  var workHours = this.calculateWorkHours(startTime, endTime)
        console.log("workhours: " + newTotal + ", oldworkhours: " + oldWorkHourTotal)
        var monday = this.setToMonday(date);
        console.log(weekday)
        monday = this.formatISOString(monday).toISOString()

        var newWorkDay = {
            "date": date,
            "start_time": startTime.toISOString(),
            "note": note,
            "end_time": endTime.toISOString(),
            "type": type
        }

        this.updateTimesheetEntry(newWorkDay, monday, weekday)
        this.recalculateHours(weekday, newTotal, oldWorkHourTotal)
    }

    setToMonday(date) {
        var tempDate = date;
        if (typeof (date) === 'string') {
            tempDate = new Date(date);
        }
        //var tempDate = new Date(date);
        var day = tempDate.getDay() || 7;
        if (day !== 1)
            tempDate.setHours(-24 * (day - 1));
        return tempDate;
    }

    renderRows() {
        var context = this;
        var tableColumns = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Delete"];
        var tasks = this.state.timesheetTasks;
        var weekdates = this.state.weekdates;
        var info = {};
        var date = "";
        console.log("going into component map")
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
                                date = weekdates[index]

                                if (day !== "Delete") {
                                    if (tasks[key][day] === undefined) {
                                        info = {
                                            "start_time": 0,
                                            "end_time": 0,
                                            "date": date,
                                            "note": ''
                                        }
                                    }

                                    else {
                                        info = tasks[key][day]
                                    }

                                    console.log("going into dialog object")
                                    return (
                                        <td className="col-1r">
                                            <SimpleDialogDemo
                                                key={date}
                                                info={info}
                                                task={tasks[key]["worktype"]}
                                                day={day}
                                                editWorkDayHours={context.editWorkDayHours.bind(context)}
                                            />
                                        </td>
                                    )
                                }
                                else if (day === "Delete") {
                                    return (<td className="col-1r">
                                        <button
                                            onClick={context.deleteTimesheetTask.bind(context, key, weekdates[0])}
                                            className="deleteButton"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    );
                                }
                            }
                        })
                    }

                </tr>
            );
        }

        );
    }

    render() {

        let work = [];
        var context = this;
        //this.getDaysOfTheWeek(this.props.calendarDate);

        this.state.workTypes.map((type, i) => {
            work.push(type.id)
        })

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

                <div className="addWorkContainer">

                    <span className="addWork"> Add Work Task done: </span>
                    <Box component="div" style={{ "marginRight": 20 }}>
                        <SimpleSelect items={work} label="Task Codes" onSelectBoxItemChange={this.updateTask.bind(this)} />
                    </Box>

                    <TimePicker
                        hour={this.state.start_hour}
                        label="Select Start Hour"
                        changeDate={this.changeFirst.bind(this)} />
                    <TimePicker
                        hour={this.state.end_hour}
                        label="Select End Hour"
                        changeDate={this.changeSecond.bind(this)} />

                    <button className="submitButton" onClick={this.handleAddWork2.bind(this)}>
                        Add
                    </button>
                </div>

            </div>
        );
    }
}