import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout/Layout";
import Home from "./pages/Home/Home";
import Repos from "./pages/Repos/Repos";
import Analytics from "./pages/Analytics/Analytics";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="repos" element={<Repos />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
