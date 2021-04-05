import React, { Component } from 'react';
import PayStubsTable from './payStubsTable';
import SimpleSelect from './selectBox';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import '../App.css';

class AdminPayStubsTable extends Component {
    constructor(props) {
        super(props);

        var employeeNames = [];
        for (var i in props.employees) {
            employeeNames.push(props.employees[i]["name"]);
        }
        this.state = {
            employeeNames: employeeNames,
            index: 0
        }
    }

    onSelectBoxItemChange(item) {
        this.setState({
            index: item
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="body" >
                    <Box component="div" style={{ "margin": 20, "display": "flex", "flexDirection": "row" }}>
                        <Typography variant="h6" noWrap style={{ "marginTop": 20, "marginRight": 10 }}>
                            Select an employee:
                        </Typography>
                        <SimpleSelect style={{ "margin": 20 }} items={this.state.employeeNames} label="Employee" onSelectBoxItemChange={this.onSelectBoxItemChange.bind(this)} />
                    </Box>
                    {/* Got to change date to id after implemetation. Date is a placeholder to work 
                    with the json server at the moment*/}
                    <PayStubsTable uid={this.props.employees[this.state.index].date} />
                </div>
            </React.Fragment>
        );
    }
}

export default AdminPayStubsTable;