import React from "react";
import { NavLink } from "react-router-dom";
import "./LeftMenuContainer.css";

function LeftMenuContainer() {
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
        <NavLink
          to="repos"
          className={`navlink ${({ isActive }) => isActive ? "navlink--active" : null}`}
        >
          Repos
        </NavLink>
        <NavLink
          to="analytics"
          className={`navlink ${({ isActive }) => isActive ? "navlink--active" : null}`}
        >
          Analytics
        </NavLink>
      </nav>
    </div>
  )
};

export default LeftMenuContainer;