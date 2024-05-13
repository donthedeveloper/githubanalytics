import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import LeftMenuContainer from "/src/components/LeftMenuContainer/LeftMenuContainer";

function Layout() {
  return (
    <div className="app-container">
      <LeftMenuContainer />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
};

export default Layout;