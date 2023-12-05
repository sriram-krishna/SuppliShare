import React from "react";
import { Routes, Route } from "react-router-dom";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import msalConfig from './utils/authConfig';

import Home from "./views/Home/Home";
import PostItem from "./views/PostItem/PostItem";

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<PostItem />} />
        </Routes>
      </div>
    </MsalProvider>
  );
}

export default App;
