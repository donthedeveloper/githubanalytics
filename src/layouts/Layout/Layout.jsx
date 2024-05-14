import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import LeftMenuContainer from "/src/components/LeftMenuContainer/LeftMenuContainer";

function Layout() {

  const [searchRepo, setSearchRepo] = React.useState(null);

  return (
    <div className="app-container">
      <LeftMenuContainer />
      <main className="main-content">
        <Outlet context={[searchRepo, setSearchRepo]} />
      </main>
    </div>
  )
};

export default Layout;