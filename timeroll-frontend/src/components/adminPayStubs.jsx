import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MaterialUIPickers from './calendarPicker';
import SimpleSelect from './selectBox';
import Divider from '@material-ui/core/Divider';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

class AdminPayStubs extends Component {
    constructor(props) {
        super(props);

        var employeeNames = [];
        for (var i in props.employees) {
            employeeNames.push(props.employees[i]["name"]);
        }
        this.state = {
            headers: ["hours", "gross", "deductions", "benefits", "net"],
            employeeNames: employeeNames,
            index: 0,
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
            examplePayStub: {
                "hours": 40,
                "gross": 1794,
                "deductions": 100,
                "benefits": 50,
                "net": 1644
            },
            employeeInfo: [{
                "name": "Cullen Rutherford",
                "salary": "12.50",
                "deductions": [{
                    "type": "SS",
                    "rate": 50
                }, {
                    "type": "tax",
                    "rate": 25
                }],
                "benefits": [{
                    "type": "medical",
                    "rate": 100
                }]
            }]
        }
    }

    useStyles = makeStyles({
        root: {
            minWidth: 275,
            marginLeft: 40,
            marginTop: 20,
            padding: 40
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        content: {
            margin: 50,
            padding: 40
        }
    });

    onSelectBoxItemChange(item) {
        console.log(item);
        this.setState({
            index: item
        });
    }


    setCalendarDate(date) {
        this.setState({
            calendarDate: date
        });
    }

    renderHeader() {

        return (
            <tr className="table-header">
                <th className="col-4r">
                    <span> Total Hours </span>
                </th>
                <th className="col-4r">
                    <span> Gross pay </span>
                </th>
                <th className="col-4r">
                    <span> Deductions </span>
                </th>
                <th className="col-4r">
                    <span> Benefits </span>
                </th>
                <th className="col-4r">
                    <span> Net pay </span>
                </th>
            </tr>
        );
    }


    renderEmployeePaystubRow() {
        var headers = this.state.headers;
        var item = this.state.examplePayStub;
        var date;
        var months = this.state.months;
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
        return (
            <div className="container">
                <div className="tableContainer">
                    <table className="responsive-table">
                        <thead>
                            {this.renderHeader()}
                        </thead>
                        <tbody>
                            <tr key={"item-1"} className="table-row">
                                {
                                    headers.map(function (key, index) {
                                        if (key === "hours") {
                                            return (
                                                <td className="col-3r">
                                                    <span>  {item[key]} </span>
                                                </td>
                                            );
                                        }
                                        else {
                                            return (
                                                <td className="col-3r">
                                                    <span>  {formatter.format(item[key])} </span>
                                                </td>
                                            );
                                        }
                                    }
                                    )
                                }

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    renderEmployeeInfo() {
        var employeeInfo = this.state.employeeInfo;
        return (
            <Card className={this.useStyles.root}>
                <CardContent style={{ "marginLeft": 50 }}>
                    <Typography className={this.useStyles.title} color="textSecondary" gutterBottom>
                        Employee Information
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {employeeInfo[0]["name"]}
                    </Typography>

                    <div style={{ "marginTop": 15 }}>
                        <Typography className={this.useStyles.pos} color="textSecondary">
                            Salary
                        </Typography>
                        <Typography style={{ "marginLeft": 20 }} variant="body2" component="p">
                            {employeeInfo[0]["salary"]}
                        </Typography>
                    </div>

                    <div style={{ "marginTop": 15 }}>
                        <Typography className={this.useStyles.pos} color="textSecondary">
                            Deductions
                        </Typography>
                        {employeeInfo[0]["deductions"].map((item, index) => {
                            return (
                                <Typography style={{ "marginLeft": 20 }} variant="body2" component="p">
                                    { item["type"]}
                                </Typography>
                            )
                        })}
                    </div>

                    <div style={{ "marginTop": 15 }}>
                        <Typography className={this.useStyles.pos} color="textSecondary">
                            Benefits
                        </Typography>
                        {employeeInfo[0]["benefits"].map((item, index) => {
                            return (
                                <Typography style={{ "marginLeft": 20 }} variant="body2" component="p">
                                    { item["type"]}
                                </Typography>
                            )
                        })}
                    </div>

                    {/* <Typography variant="body2" component="p">
                        well meaning and kindly.
                    <br />
                        {'"a benevolent smile"'}
                    </Typography> */}
                </CardContent>
            </Card>


            // <Box component="div" className="employeeInfoContainer">
            //     <Typography variant="h5" style={{ "marginBottom": 10, "marginTop": 10 }}>Employee Information</Typography>

            //     <div className="item">
            //         <Typography variant="h6">Name: </Typography>
            //         <Typography variant="h6" style={{ "marginLeft": 20 }}>{employeeInfo[0]["name"]}</Typography>
            //     </div>

            //     <div className="item">
            //         <Typography variant="h6">Salary:</Typography>
            //         <Typography variant="h6" style={{ "marginLeft": 20 }}>{employeeInfo[0]["salary"]}</Typography>
            //     </div>
            //     <div className="item2">
            //         <Typography variant="h6">Deductions:</Typography>
            //         {employeeInfo[0]["deductions"].map((item, index) => {
            //             return (
            //                 <Typography variant="h6" style={{ "marginLeft": 40 }}>
            //                     { item["type"]}
            //                 </Typography>
            //             )
            //         })}
            //     </div>
            //     <div className="item2">
            //         <Typography variant="h6">Benefits:</Typography>
            //         {employeeInfo[0]["benefits"].map((item, index) => {
            //             return (
            //                 <Typography variant="h6" style={{ "marginLeft": 40 }}>
            //                     { item["type"]}
            //                 </Typography>
            //             )
            //         })}
            //     </div>
            // </Box>
        )
    }

    render() {
        return (
            <React.Fragment>
                <div className="body" >
                    <div className="datepickers">
                        <Box component="div" style={{ "margin": 10, "display": "flex", "flexDirection": "row" }}>
                            <Typography variant="h6" noWrap style={{ "marginTop": 20, "marginRight": 10 }}>
                                Select an employee:
                            </Typography>
                            <SimpleSelect
                                style={{ "margin": 10 }}
                                items={this.state.employeeNames}
                                label="Employee"
                                onSelectBoxItemChange={this.onSelectBoxItemChange.bind(this)} />
                        </Box>
                        <MaterialUIPickers calendarDate={this.state.calendarDate} setCalendarDate={this.setCalendarDate.bind(this)} />

                        <button className="submitButton" style={{ "marginTop": 20, "marginLeft": 50 }}>
                            Generate Paystubs
                        </button>

                    </div>
                    {this.renderEmployeePaystubRow()}
                    <Divider variant="middle" />
                    {this.renderEmployeeInfo()}
                </div>
            </React.Fragment>
        );
    }
}

export default AdminPayStubs;