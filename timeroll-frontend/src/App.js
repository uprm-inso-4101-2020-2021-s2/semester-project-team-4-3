import React, { Component } from 'react';
import NavBar from './components/navbar';
import SideNavBar from './components/sidenavbar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Timesheet from './components/timesheet';

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
  state = {

  }

  componentDidMount() {
    // Ajax Calls - last phase
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ThemeProvider theme={theme}>
          <div className="bodyContainer" id="wrapper">
            <SideNavBar />
            <Timesheet />
          </div>
        </ThemeProvider>
      </React.Fragment>
    );
  }

}

export default App;
