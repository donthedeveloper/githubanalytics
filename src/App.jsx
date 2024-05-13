import React from "react";
import "./App.css";
import GitgraphComponent from "./components/GitgraphComponent/GitgraphComponent";
import LeftMenu from "./components/LeftMenu/LeftMenu";

function App() {

  return (
    <div className="app-container">
      <div className="left-menu">
        <LeftMenu />
      </div>
      <GitgraphComponent />
    </div>
  )
};

export default App;
