import React, { Component } from 'react';
import NavBar from './components/navbar';
import SideNavBar from './components/sidenavbar';
import MaterialUIPickers from './components/calendarPicker';
import Timesheet from './components/timesheet';

import './App.css';

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
        <div className="bodyContainer" id="wrapper">
          <SideNavBar />
          <Timesheet />

        </div>
      </React.Fragment>
    );
  }

}

export default App;
