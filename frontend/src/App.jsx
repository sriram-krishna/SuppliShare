import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

import { msalConfig } from './authConfig';
import LoginView from './views/Login/Login';
import Header from './components/shared/Header/Header';

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
          <Routes>
              <Route path="/login" element={<LoginView />} />
              <Route path="/home" element={<Header />} />
          </Routes>
      </Router>
    </MsalProvider>
  );
}

export default App;
