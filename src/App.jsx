import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from './authConfig';
import LoginView from './views/Login/Login';
import Header from './components/shared/Header/Header';
import Navbar from '../src/NavBar/navbar';
import AccountSettings from './components/Account-Settings/AccountSettings';
import EditEmail from './components/Account-Settings/EditEmail';
import Home from './components/Account-Settings/Home';
import EditPassword from './components/Account-Settings/EditPassword';
import EditZipcode from './components/Account-Settings/EditZipcode';
import EditSchool from './components/Account-Settings/EditSchool';
import LandingPage from './views/Login/Landing-page';
import ForgotPasswordEmailSubmission from './views/Login/ForgotPassword';
import DonorSignUpView from './views/Login/DonorSignup';
import TeacherSignUpView from './views/Login/DonorSignup';
import WatermarkComponent from './views/Login/watermark';

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  const [headerState, setHeaderState] = useState("loggedout");

  const handleSetHeaderState = (newState) => {
    setHeaderState(newState);
  };

  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <Header showSearch={true} user={{ firstName: 'John' }} handleSetLoggedIn={handleSetHeaderState} loggedIn={headerState} />
        <Navbar />
		<WatermarkComponent/>
        <Routes>
          <Route
            path="/"
            element={<LandingPage handleSetHeaderState={handleSetHeaderState} />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/DonorSignUp" element={<DonorSignUpView />} />
		  <Route path="/TeacherSignUp" element={<TeacherSignUpView />} />
          <Route path="/Login" element={<LoginView />} />
          <Route path="/ForgotPassword" element={<ForgotPasswordEmailSubmission />} />
          <Route path="/EditSettings" element={<Home />} />
          <Route path="/AccountSettings" element={<AccountSettings />} />
          <Route path="/EditEmail" element={<EditEmail />} />
          <Route path="/EditPassword" element={<EditPassword />} />
          <Route path="/EditZipcode" element={<EditZipcode />} />
          <Route path="/EditSchool" element={<EditSchool />} />
          {/* other routes */}
        </Routes>
      </Router>
    </MsalProvider>
  );
}

export default App;
