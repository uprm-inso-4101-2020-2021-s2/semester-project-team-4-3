import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import App from './App.js';
import './App.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const baseUrl = "http://localhost:3001/Employees";
const cookies = new Cookies();


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            username: '',
            password: '',
            response: {}
        }
    }

    loginStyle = {
        maxWidth: 345,
        position: "fixed",
        top: "50%",
        left: "50%",
        marginTop: "-50px",
        marginLeft: "-100px",
        display: "flex",
        flexDirection: "row"
    }

    useStyles = makeStyles({
        root: {
            maxWidth: 345,
            position: "fixed",
            top: "50%",
            left: "50%",
            marginTop: "-50px",
            marginLeft: "-100px",
            display: "flex",
            flexDirection: "row"
        },
        media: {
            height: 140,
        },
    });

    componentDidUpdate(prevState) {
        if (prevState.response !== this.state.response) {
            console.log("link")
            return (<Link to="/app" />)
        }
    }

    // handleChange = async e => {
    //     await this.setState({
    //         form: {
    //             ...this.state.form,
    //             [e.target.name]: e.target.value
    //         }
    //     })
    //     // const {name,value} = e.target
    //     // this.setState({[name]:value})
    //     console.log(this.state.form);
    // }

    handleInputChange(e) {
        console.log(e.target.name);

        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(e.target.value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        <Router path="/Menu" />
    }

    // initSess = async () => {
    //     await axios.get(baseUrl, { params: { username: this.state.form.username, password: this.state.form.password } })
    //         .then(response => {
    //             return response.data;
    //         })
    //         .then(response => {
    //             if (response.length > 0) {
    //                 var response = response[0];
    //                 cookies.set('id', response.id, { path: "/" });
    //                 cookies.set('Last_Name', response.Last_Name, { path: "/" });
    //                 cookies.set('Name', response.name, { path: "/" });
    //                 cookies.set('username', response.username, { path: "/" });
    //                 alert(`Welcome ${response.Name} ${response.Last_Name}`);
    //                 window.location.href = "./App";
    //             } else {
    //                 alert('Username or password is incorrect');
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })

    // }

    initSess = async (context) => {
        await axios.get(baseUrl + "/" + context.state.username)
            .then((response) => {
                console.log(response.data)
                // handle success
                context.setState({
                    response: response.data
                })

            })
            .catch(function (error) {
                console.log(error);
            })

    }


    render() {
        var context = this;
        return (
            <div className='div-login'>

                <Router>
                    <Card style={{ "backgroundColor": "#61dafb" }} className="loginCard" >
                        <CardContent>
                            <Typography gutterBottom variant="h1" component="h1">
                                Timeroll
                        </Typography>
                        </CardContent>

                        <div className="cardContent">
                            <TextField
                                style={{ "marginTop": 20, "marginLeft": 30, "marginRight": 30 }}
                                required
                                value={this.state.username}
                                id="filled-required"
                                label="Username"
                                variant="outlined"
                                name="username"
                                onChange={(e) => this.handleInputChange(e, context)}
                            />
                            <TextField
                                style={{ "marginTop": 20, "marginLeft": 30, "marginRight": 30 }}
                                required
                                value={this.state.password}
                                id="filled-password-input"
                                label="Password"
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                variant="outlined"
                                onChange={(e) => this.handleInputChange(e, context)}
                            />
                            <Button style={{ "marginTop": 20 }} size="small" color="primary" onClick={() => this.initSess(context)}>
                                Login
                            </Button>



                        </div>
                    </Card>

                </Router>
            </div>
        )
    }
}

export default Login;