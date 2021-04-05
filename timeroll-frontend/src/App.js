import React, { Component } from 'react';
import NavBar from './components/navbar';
import SideNavBar from './components/sidenavbar';
import MiniDrawer from './components/sideNavMaterial';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Timesheet from './components/timesheet';
import Paystub from './components/payStubs';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
  }

})

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Cullen Rutherford",
      uType: "admin"
    }
  }

  componentDidMount() {
    // Ajax Calls - last phase
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <ThemeProvider theme={theme}>
            <div className="bodyContainer" id="wrapper">
              <MiniDrawer name={this.state.name} />
              <Route exact path="/" render={() => (
                <Timesheet {...this.state} isAuthed={true} />
              )} />

              <Route path="/paystub" render={() => (
                <Paystub {...this.state} isAuthed={true} />
              )} />
              {/* <Timesheet /> */}
            </div>
          </ThemeProvider>
        </Router>
      </React.Fragment>
    );
  }

}

export default App;
