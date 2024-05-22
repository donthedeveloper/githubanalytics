import React from "react";
import "./GraphLayout.css";
import { NavLink, Outlet } from "react-router-dom";
import GitgraphComponent from "../../components/GitgraphComponent/GitgraphComponent";

function GraphLayout() {
  return (
    <>
      <div className="graph-layout">
        <NavLink 
          to="/"
          className="navlink--back"
        >
          <i className="fa-solid fa-arrow-left-long"></i> Choose another repo
        </NavLink>
        <div className="repo-header">
          <p className="repo-header--name">Repo name</p>
        </div>
        <GitgraphComponent />
        <Outlet />
      </div>
    </>
  )
};

export default GraphLayout;