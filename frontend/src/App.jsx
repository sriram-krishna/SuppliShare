import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

import { msalConfig } from './authConfig';
import LoginView from './views/Login/Login';
import Header from './components/shared/Header/Header';

import AccountSettings from './components/Account-Settings/AccountSettings';
import EditEmail from './components/Account-Settings/EditEmail';
import Home from './components/Account-Settings/Home';
import EditPassword from './components/Account-Settings/EditPassword';
import EditZipcode from './components/Account-Settings/EditZipcode';
import EditSchool from './components/Account-Settings/EditSchool';

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <Routes>
        
          <Route path="/" element={<LoginView />} /> "/" represents the default/initial page user would start at
          <Route path="/home" element={<Header />} />
          <Route path="/EditSettings" element={<Home />} />
          <Route path="/AccountSettings" element={<AccountSettings />} />
          <Route path="/EditEmail" element={<EditEmail />} />
          <Route path="/EditPassword" element={<EditPassword />} />
          <Route path="/EditZipcode" element={<EditZipcode />} />
          <Route path="/EditSchool" element={<EditSchool />} />
        </Routes>
      </Router>
    </MsalProvider>
  );
}

export default App;
