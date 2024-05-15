import React from "react";
import { signInWithGithub } from "/src/firebase";
import "./LoginButton.css";

function LoginButton() {
  return (
    <button
      className="login-btn"
      onClick={signInWithGithub}
    >
      Login
    </button>
  )
};

export default LoginButton;