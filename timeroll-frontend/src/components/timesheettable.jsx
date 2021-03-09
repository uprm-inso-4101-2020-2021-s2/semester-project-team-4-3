import React, { Component } from 'react';
import TimePicker from './timepicker';
import '../App.css';

export default class TimeSheetTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            items: [],
            counter: 0,
            start_hour: new Date('2014-08-18T21:11:54'),
            end_hour: new Date('2014-08-18T21:11:54'),
            totals: {
                "mon": 0,
                "tue": 0,
                "wed": 0,
                "thu": 0,
                "fri": 0,
                "sat": 0
            },
            weekdays: ["sun", 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            workTypes: []
        }
    }

    componentDidMount() {
        this.setState({
            workTypes: [
                { id: 'NONE', name: 'None' },
                { id: 'SECRT', name: 'Secretarial' },
                { id: 'LABTR', name: 'Laboratorio' },
                { id: 'FACTU', name: 'Facturacion' },
                { id: 'MUEST', name: 'Toma de Muestra' }
            ]
        });
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

        console.log(this.state.items);
    }

    handleItemChanged(i, event) {
        var items = this.state.items;

        items[i] = event.target.value;

        this.setState({
            items: items
        });
        console.log(this.state.items);
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

        var start_time = String(start.getHours() + ":" + start.getMinutes());
        var end_time = String(end.getHours() + ":" + end.getMinutes());
        var today = weekdays[new Date().getDay()];
        console.log(today);

        var workEntry = {
            "type": this.state.message,
            [today]: {
                "start_hour": start_time,
                "end_hour": end_time
            }
        };
        console.log(workEntry)

        // var workEntry = {
        //     "type": this.state.message,
        //     "mon": {
        //         "start_hour": "0",
        //         "end_hour": "0"
        //     },
        //     "tue": {
        //         "start_hour": "0",
        //         "end_hour": "0"
        //     },
        //     "wed": {
        //         "start_hour": "0",
        //         "end_hour": "0"
        //     },
        //     "thu": {
        //         "start_hour": "0",
        //         "end_hour": "0"
        //     },
        //     "fri": {
        //         "start_hour": "0",
        //         "end_hour": "0"
        //     },
        //     "sat": {
        //         "start_hour": "0",
        //         "end_hour": "0"
        //     }
        // };

        var items = this.state.items;

        items[counter] = workEntry;

        counter = counter + 1;

        this.setState({
            items: items,
            counter: counter
        });
        console.log(typeof (start))
        console.log(this.state.items);
        var diff = this.calculateWorkHours(start, end);
        this.recalculateHours(today, diff, true);
    }

    calculateWorkHours(start, end) {
        var diff = (end.getTime() - start.getTime()) / 1000;
        diff /= (60 * 60);
        return Math.abs(diff);
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

    // recalculateHours(workday, items) {
    //     var totals = this.state.totals;
    //     var hours;

    //     var total = 0;
    //     items.map((item, index) => {
    //         hours = Number(items[index][workday])
    //         console.log(typeof hours);
    //         total = Object.entries(item).length === 0 && item.constructor === Object ?
    //             total + 0 : total + hours;
    //         console.log("total: " + total);
    //     });

    //     totals[workday] = total

    //     this.setState({
    //         items: items,
    //         totals: totals
    //     });

    //     this.renderTotalRow();
    // }

    handleWorkHoursChanged(i, workday, event) {
        var items = this.state.items;
        var value = event.target.value;
        value = value.replace(/\D/g, "");

        console.log(items);

        items[i][workday] = value;

        this.recalculateHours(workday, items);
    }

    handleStartWorkHoursChanged(i, workday, event) {
        var items = this.state.items;
        var value = event.target.value;
        value = value.replace(/\D/g, "");

        console.log(items);

        items[i][workday]["start_hour"] = value;

        // this.recalculateHours(workday, items);
    }

    handleEndWorkHoursChanged(i, workday, event) {
        var items = this.state.items;
        var value = event.target.value;
        value = value.replace(/\D/g, "");

        console.log(items);

        if (value)
            items[i][workday]["end_hour"] = value;
        //this.recalculateHours(workday, items);
    }

    renderTotalRow() {
        var context = this;
        var totals = this.state.totals;
        return (
            <tr key={"item-5"} className="tableRows">
                <td className="workTypeColumn">
                    <span> totals </span>
                </td>
                <td>
                    <span> {totals["mon"]} </span>
                </td>
                <td>
                    <span> {totals["tue"]} </span>
                </td>
                <td>
                    <span> {totals["wed"]} </span>
                </td>
                <td>
                    <span> {totals["thu"]} </span>
                </td>
                <td>
                    <span> {totals["fri"]} </span>
                </td>
                <td>
                    <span> {totals["sat"]} </span>
                </td>
            </tr>
        );

    }

    changeFirst(hour) {
        console.log(hour);
        this.setState({
            start_hour: hour,
        });
    }

    changeSecond(hour) {
        console.log(hour);
        this.setState({
            end_hour: hour,
        });
    }

    renderRows() {
        var context = this;
        var tableColumns = ["mon", "tue", "wed", "thu", "fri", "sat", "delete"];

        return this.state.items.map(function (o, i) {
            return (
                <tr key={"item-" + i} className="tableRows">
                    <td className="workTypeColumn">
                        <span
                            type="text"
                            value={o["type"]}
                        > {o["type"]} </span>
                    </td>

                    {
                        tableColumns.map(function (day, index) {

                            if (Object.keys(o).length !== 0) {
                                if (day !== "delete" && o[day] !== undefined) {
                                    if (o[day]["start_hour"] !== undefined) {
                                        console.log("defined: ", day);
                                    }
                                    return (
                                        <td>
                                            <div className="workInputContainer">
                                                <span> Start hour: </span>
                                                <span> {o[day]["start_hour"]}  </span>
                                            </div>
                                            <div className="workInputContainer">
                                                <span> End hour: </span>
                                                <span> {o[day]["end_hour"]} </span>
                                                {/* <input
                                                    type="text"
                                                    value={o[day]}
                                                    onChange={context.handleWorkHoursChanged.bind(context, i, day)}
                                                /> */}
                                            </div>
                                        </td>
                                    )
                                }
                                else if (day === "delete") {
                                    return (<td>
                                        <button
                                            onClick={context.handleItemDelete.bind(context, i)}
                                        >
                                            Delete
                                                    </button>
                                    </td>)
                                }
                                else {
                                    console.log("-");
                                    return (
                                        <td>
                                            <div className="workInputContainer">
                                                <span> - </span>

                                            </div>
                                        </td>);
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

        let work = this.state.workTypes;
        let optionItems = work.map((types) =>
            <option key={types.id}>{types.id}</option>
        );
        return (
            <div>
                <table style={this.tableStyle}>
                    <thead>
                        <tr>
                            <th >Work type </th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                        {this.renderTotalRow()}
                    </tbody>
                </table>
                <hr />

                <span className="addWork"> Add Work Task done: </span>
                <select onChange={this.updateMessage.bind(this)}>
                    {optionItems}
                </select>

                <div className="addWorkContainer">

                    <TimePicker hour={this.state.start_hour}
                        label="Select Start Hour"
                        changeDate={this.changeFirst.bind(this)} />
                    <TimePicker hour={this.state.end_hour}
                        label="Select End Hour"
                        changeDate={this.changeSecond.bind(this)} />

                    <button className="workContainerBtn" onClick={this.handleAddWork.bind(this)}>
                        Add
                    </button>
                </div>

            </div>
        );
    }
}