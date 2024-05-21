import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getUserGithubAccessToken, auth, db } from "/src/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import "./App.css";
import Layout from "./layouts/Layout/Layout";
import Home from "./pages/Home/Home";
import Repos from "./pages/Repos/Repos";
import Analytics from "./pages/Analytics/Analytics";

const AuthContext = React.createContext();

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [ghToken, setGhToken] = React.useState();

  // need to check auth uid against db and setGhToken if uid of logged in user matches.
  if (user) {
    getUserGithubAccessToken(auth, db);
  };
  
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