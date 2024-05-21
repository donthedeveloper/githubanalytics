import React from "react";
import { NavLink } from "react-router-dom";
import "./LeftMenuContainer.css";
import { AuthContext } from "/src/App";
import LeftMenuLoggedInButtons from "./LeftMenuLoggedInButtons/LeftMenuLoggedInButtons";
import LoginButton from "./LoginButton/LoginButton";

function LeftMenuContainer() {

  const userAuth = React.useContext(AuthContext);

  return (
    <div className="left-menu-container">
      <p className="nav-logo">GitAnalyzer</p>
      <nav className="navlink-container">
        <NavLink
          to="/"
          className={`navlink ${({ isActive }) => isActive && "navlink--active"}`}
        >
          Home
        </NavLink>
        {
          userAuth
          ? <LeftMenuLoggedInButtons />
          : <LoginButton />
        }
      </nav>
    </div>
  )
};

export default LeftMenuContainer;