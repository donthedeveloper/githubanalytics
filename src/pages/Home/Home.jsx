import React from "react";
import "./Home.css";
import HomeForm from "/src/components/HomeForm/HomeForm";
import GitApp from "/src/components/GitApp/GitApp";

function Home() {
  return (
    <>
      <HomeForm />
      <br />
      <br />
      <h1>Sign-in using the button below:</h1>
      <GitApp />
    </>
  )
};

export default Home;