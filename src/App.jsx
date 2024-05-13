import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout/Layout";
import Home from "./components/Home/Home";
import Repos from "./components/Repos/Repos";
import Analytics from "./components/Analytics/Analytics";

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
