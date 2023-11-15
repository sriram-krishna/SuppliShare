import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/shared/Header/Header';
import LandingPage from './views/Login/Landing-page';
import DonorSignUpView from './views/Login/DonorSignup';
import TeacherSignUpView from './views/Login/DonorSignup';
import WatermarkComponent from './views/Login/watermark';
import Navbar from './components/shared/NavBar/navbar';
import Home from './components/Account-Settings/Home';
import ForgotPasswordEmailSubmission from './views/Login/ForgotPassword';

function App() {
  const [headerState, setHeaderState] = useState('loggedout');
  const [navBarState, setNavBarState] = useState('none');

  const handleSetHeaderState = (newState) => {
    setHeaderState(newState);
  };

  const updateHeaderState = () => {
    const isHomePage = window.location.pathname === '/home';
    const isLanding = window.location.pathname === '/';
    const isDonor = window.location.pathname === '/DonorSignUp';

    if (isHomePage) {
      setHeaderState('loggedin');
      setNavBarState('Donor');
    } else if (isLanding) {
      setHeaderState('loggedout');
      setNavBarState('none');
    } else if (isDonor) {
      console.log('isDonor is true');
      setHeaderState('none');
    } else {
      setHeaderState('loggedin');
      setNavBarState('none');
    }
  };

  // Update header state when the component mounts
  useEffect(() => {
    updateHeaderState();
  }, []);

  // Listen for changes in the route and update header state
  useEffect(() => {
    updateHeaderState();
  }, [window.location.pathname]);

  // Listen for the popstate event to handle back button clicks
  useEffect(() => {
    const handlePopstate = () => {
      updateHeaderState();
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return (
    <Router>
      <Header showSearch={true} user={{ firstName: 'John' }} handleSetLoggedIn={handleSetHeaderState} loggedIn={headerState} />

      <WatermarkComponent />
      <Navbar navBarState={navBarState} />
      <Routes>
        <Route path="/" element={<LandingPage handleSetHeaderState={handleSetHeaderState} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/DonorSignUp" element={<DonorSignUpView />} />
        <Route path="/TeacherSignUp" element={<TeacherSignUpView />} />
        <Route path="/ForgotPassword" element={<ForgotPasswordEmailSubmission />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;
