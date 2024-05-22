import React from "react";
import { NavLink } from "react-router-dom";

function LeftMenuLoggedInButton() {
  return (
    <>
      <NavLink
        to="graphs"
        className={`navlink ${({ isActive }) => isActive ? "navlink--active" : null}`}
      >
      Graphs
      </NavLink>
    </>
  )
};

export default LeftMenuLoggedInButton;