import React from "react";
import "./Home.css";
import HomeForm from "/src/components/HomeForm/HomeForm";
import { signInWithGithub, auth } from "/src/firebase";
import { getAuth } from "firebase/auth";

function Home() {

  return (
    <>
      <HomeForm />
      <br />
      <br />
      <button onClick={signInWithGithub}>Sign In</button>
    </>
  )
};

export default Home;