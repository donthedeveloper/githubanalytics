import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-logo-container">
        <h1>Enter the URL of the repo to start</h1>
      </div>
      <input
        className="home-repo-input"
      ></input>
    </div>
  )
};

export default Home;