import React from "react";
import "./App.css";

//Components
import Navbar from "./components/Navbar";
import Login from "./components/Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  render() {
    return (
      <div className="app-container">
        <Navbar></Navbar>
      </div>
    );
  }
}

export default App;
