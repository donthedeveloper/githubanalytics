import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "/src/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import "./App.css";
import Layout from "./layouts/Layout/Layout";
import Home from "./pages/Home/Home";
import Repos from "./pages/Repos/Repos";
import Analytics from "./pages/Analytics/Analytics";

const AuthContext = React.createContext();

function App() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <AuthContext.Provider value={user}>
            <Layout />
          </AuthContext.Provider>
        }>
          <Route index element={<Home />} />
          <Route path="repos" element={<Repos />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export { AuthContext };
export default App;