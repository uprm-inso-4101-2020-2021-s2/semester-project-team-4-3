import React, { Component } from 'react';
import '../App.css';

export default class TimeSheetTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            items: [{}, {}, {}, {}, {}],
            counter: 0,
            totals: {}
        }
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
        var counter = this.state.counter

        var workEntry = {
            "type": this.state.message,
            "mon": "0",
            "tue": "1",
            "wed": "2",
            "thu": "4",
            "fri": "5",
            "sat": "6"
        };
        var items = this.state.items;

        items[counter] = workEntry;
        // items.push(workEntry);

        counter = counter + 1;

        this.setState({
            items: items,
            counter: counter
        });

        console.log(this.state.items);
    }

    handleWorkHoursChanged(i, workday, event) {
        var items = this.state.items;
        var totals = this.state.totals;
        var value = event.target.value;
        value = value.replace(/\D/g, "");

        console.log(items);

        items[i][workday] = value;
        console.log(items[i].workday);
        console.log("workday ", workday, " value: ", items[i[workday]]);

        var total = 0;
        items.map((item, index) => {
            total = items[index][workday] === undefined ?
                parseFloat(0 + total) : parseFloat(items[index][workday] + total);
        });

        totals[workday] = total

        this.setState({
            items: items,
            totals: totals
        });
        this.renderTotalRow();
        console.log(this.state.items);
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

    renderRows() {
        var context = this;

        return this.state.items.map(function (o, i) {
            return (
                <tr key={"item-" + i} className="tableRows">
                    <td className="workTypeColumn">
                        <span
                            type="text"
                            value={o["type"]}
                        > {o["type"]} </span>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={o["mon"]}
                            onChange={context.handleWorkHoursChanged.bind(context, i, "mon")}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={o["tue"]}
                            onChange={context.handleWorkHoursChanged.bind(context, i, "tue")}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={o["wed"]}
                            onChange={context.handleWorkHoursChanged.bind(context, i, "wed")}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={o["thu"]}
                            onChange={context.handleWorkHoursChanged.bind(context, i, "thu")}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={o["fri"]}
                            onChange={context.handleWorkHoursChanged.bind(context, i, "fri")}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={o["sat"]}
                            onChange={context.handleWorkHoursChanged.bind(context, i, "sat")}
                        />
                    </td>
                    <td>
                        <button
                            onClick={context.handleItemDelete.bind(context, i)}
                        >
                            Delete
                    </button>
                    </td>
                </tr>
            );
        });
    }

    render() {
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
                <span className="addWork"> Add New Work Code: </span>
                <input type="text" onChange={this.updateMessage.bind(this)} />
                <button onClick={this.handleAddWork.bind(this)}>
                    Add
                    </button>
            </div>
        );
    }
}