import React, { Component } from 'react';
import '../App.css';

export default class TimeSheetTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            items: [{}, {}, {}, {}, {}],
            counter: 0,
            totals: {
                "mon": "0",
                "tue": "0",
                "wed": "0",
                "thu": "0",
                "fri": "0",
                "sat": "0"
            },
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
        var counter = this.state.counter

        var workEntry = {
            "type": this.state.message,
            "mon": "0",
            "tue": "0",
            "wed": "0",
            "thu": "0",
            "fri": "0",
            "sat": "0"
        };
        var items = this.state.items;

        items[counter] = workEntry;

        counter = counter + 1;

        this.setState({
            items: items,
            counter: counter
        });

        console.log(this.state.items);

    }

    recalculateHours(workday, items) {
        var totals = this.state.totals;
        var hours;

        var total = 0;
        items.map((item, index) => {
            hours = Number(items[index][workday])
            console.log(typeof hours);
            total = Object.entries(item).length === 0 && item.constructor === Object ?
                total + 0 : total + hours;
            console.log("total: " + total);
        });

        totals[workday] = total

        this.setState({
            items: items,
            totals: totals
        });

        this.renderTotalRow();
    }

    handleWorkHoursChanged(i, workday, event) {
        var items = this.state.items;
        var value = event.target.value;
        value = value.replace(/\D/g, "");

        console.log(items);

        items[i][workday] = value;

        this.recalculateHours(workday, items);
    }

    // handleWorkHoursChanged(i, workday, event) {
    //     var items = this.state.items;
    //     var totals = this.state.totals;
    //     var value = event.target.value;
    //     value = value.replace(/\D/g, "");
    //     var hours;

    //     console.log(items);

    //     items[i][workday] = value;
    //     console.log(items[i].workday);
    //     console.log("workday ", workday, " value: ", items[i][workday]);

    //     var total = 0;
    //     items.map((item, index) => {
    //         hours = Number(items[index][workday])
    //         console.log(typeof hours);
    //         total = Object.entries(item).length === 0 && item.constructor === Object ?
    //             total + 0 : total + hours;
    //         // total = total + hours;
    //         // Object.entries(obj).length === 0 && obj.constructor === Object
    //         // total = hours === NaN ?
    //         //     Number(0 + total) : Number(hours + total);
    //         console.log("total: " + total);
    //     });

    //     totals[workday] = total

    //     this.setState({
    //         items: items,
    //         totals: totals
    //     });

    //     this.renderTotalRow();
    //     // console.log(this.state.items);
    // }

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
                        {/* <select>
                            {optionItems}
                        </select> */}
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
                {/* <input type="text" onChange={this.updateMessage.bind(this)} /> */}
                <select onChange={this.updateMessage.bind(this)}>
                    {optionItems}
                </select>
                <button onClick={this.handleAddWork.bind(this)}>
                    Add
                    </button>
            </div>
        );
    }
}