import React from "react";
import "./App.css";

//Components
import Navbar from "./components/Navbar";
import FriendRequests from "./components/FriendRequests";

function App() {
  return (
    <div className="app-container">
      <Navbar></Navbar>
      <FriendRequests></FriendRequests>
    </div>
  );
}

export default App;
