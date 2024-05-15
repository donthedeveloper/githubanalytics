import React from "react";
import { NavLink } from "react-router-dom";

function LeftMenuLoggedInButtons() {
  return (
    <>
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
    </>
  )
};

export default LeftMenuLoggedInButtons;