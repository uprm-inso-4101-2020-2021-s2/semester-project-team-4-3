import React, { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router-dom';
import '../App.css'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const initSess = async (context) => {

        await axios.get(props.baseUrl + "/" + username)
            .then((response) => {
                console.log(response.data)
                // handle success
                props.history.push('/timesheet');
                props.setCredentials(response.data, true);

            })
            .catch(function (error) {
                setError("User Not Found. Incorrect Username or password");
                console.log(error);
            })

    }

    return (
        <Box
            boxShadow={3}
            bgcolor="background.paper"
            m={1}
            p={1}
            className="loginCard"
        >
            <form >
                <div style={{ "width": 500, "backgroundColor": "#365aad", "paddingBottom": 150, "paddingTop": 100 }}>
                    <Typography variant="h1" color="textSecondary">
                        TimeRoll
                </Typography>
                </div>
                <div className="cardContent">
                    <TextField
                        style={{ "margin": 30, "marginBottom": 20, "width": 350 }}
                        label="Username"
                        variant="outlined"
                        className="form-input"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                        style={{ "margin": 30, "width": 350 }}
                        label="Password"
                        variant="outlined"

                        className="form-input"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    className="form-input"
                    size="large"
                    onClick={initSess}
                    style={{ "marginBottom": 30 }}
                >
                    Login
                </Button>

                {error && (
                    <Alert severity="error" onClick={() => setError(null)}>
                        {props.error || error}
                    </Alert>
                )}
            </form>
        </Box>

    );
};
export default withRouter(Login);