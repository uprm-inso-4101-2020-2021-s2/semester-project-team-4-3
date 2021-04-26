import React, { Component } from 'react';
import MiniDrawer from './components/sideNavMaterial';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Timesheet from './pages/timesheet';
import Paystub from './pages/payStubs';
import Requests from './pages/requests';
import Login from './pages/login2';
import Profiles from './pages/profiles';
import store from 'store';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#4b9fea",
      main: "#1e88e5",
      dark: "#155fa0",
      contrastText: "#fff"
    },
    secondary: {
      light: "#eb6e47",
      main: "#e64a19",
      dark: "#a13311",
      contrastText: "#fff"
    }
  },
  overrides: {
    MuiTypography: {
      colorTextSecondary: {
        color: "#fff"
      },
      colorTextPrimary: {
        color: "#484848"
      }
    }
  }

})

const baseUrl = "http://localhost:3001/Employees";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: baseUrl,
      name: '',
      username: '',
      uType: '',
      isLoggedIn: false
    }
  }

  setCredentials(responseData, loggedIn) {
    var isLogged = loggedIn ? true : false;
    store.set('loggedIn', true);
    this.setState({
      name: responseData["name"],
      uType: responseData["uType"],
      username: responseData["date"],
      isLoggedIn: isLogged
    });
  }

  logOut() {
    this.setState({
      isLoggedIn: false
    });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    var context = this;
    return (
      <React.Fragment>
        <Router>
          <ThemeProvider theme={theme}>
            <Route path="/login" render={() => (
              <Login setCredentials={this.setCredentials.bind(context)} baseUrl={this.state.baseUrl} />)} />

            {
              (isLoggedIn || store.loggedIn) ?
                <div className="bodyContainer" id="wrapper">
                  <MiniDrawer name={this.state.name} logOut={this.logOut.bind(context)} />
                  <Route exact path="/timesheet" render={() => (
                    <Timesheet {...this.state} isAuthed={isLoggedIn ? true : false} />
                  )} />

                  <Route path="/paystub" render={() => (
                    <Paystub {...this.state} isAuthed={true} />
                  )} />

                  <Route path="/requests" render={() => (
                    <Requests {...this.state} isAuthed={true} />
                  )} />
                  <Route path="/profiles" render={() => (
                    <Profiles {...this.state} isAuthed={true} />
                  )} />
                </div>

                : <Login setCredentials={this.setCredentials.bind(context)} baseUrl={this.state.baseUrl} />
            }
          </ThemeProvider>


        </Router>
      </React.Fragment>
    );
  }

}

export default App;
