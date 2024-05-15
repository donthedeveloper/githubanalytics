import React from "react";
import "./Home.css";
import HomeForm from "/src/components/HomeForm/HomeForm";
import { signInWithGithub, logout, auth } from "/src/firebase";

function Home() {

  return (
    <>
      <HomeForm />
      <br />
      <br />
      <button onClick={logout}>Log out</button>
    </>
  )
};

export default Home;