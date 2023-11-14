import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginView from './views/Login/Login';
import Header from './components/shared/Header/Header';

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

import ItemUpload from './components/shared/NavBar/itemUpload';
import Navbar from './components/shared/NavBar/navbar';


function App() {
  const [headerState, setHeaderState] = useState("loggedout");
  const [navBarState, setnavBarState] = useState("none");

  const handleSetHeaderState = (newState) => {
    setHeaderState(newState);
  };
  

  // Check if the user is on the homepage
  const isHomePage = window.location.pathname === '/home';

  // Update header state when the component mounts
  useEffect(() => {
    if (isHomePage) {
      setHeaderState("loggedin");
    } else {
      setHeaderState("loggedout");
    }
  }, [isHomePage]);
  useEffect(() => {
    if (isHomePage) {
      setnavBarState("Donor");
    } else {
      setnavBarState("none");
    }
  }, [isHomePage]);

  return (
    
      <Router>
        <Header showSearch={true} user={{ firstName: 'John' }} handleSetLoggedIn={handleSetHeaderState} loggedIn={headerState} />
        
		<WatermarkComponent/>
		<Navbar navBarState={navBarState} />
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
		  <Route path="/imageUploader" element={<imageUploader />} />
		  <Route path="/itemUpload" element={<ItemUpload />} />

          {/* other routes */}
        </Routes>
      </Router>
  );
}

export default App;
