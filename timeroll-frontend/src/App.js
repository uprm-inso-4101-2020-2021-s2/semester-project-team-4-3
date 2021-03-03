import React, { Component } from 'react';
import NavBar from './components/navbar';
import SideNavBar from './components/sidenavbar';
import ResponsiveDatePickers from './components/calendarPicker';
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
          <div id="body" className="body">
            <ResponsiveDatePickers />
          </div>
        </div>
      </React.Fragment>
    );
  }

}

export default App;
