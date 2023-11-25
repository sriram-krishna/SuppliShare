import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/shared/Header/Header';
import Home from './components/Account-Settings/Home';
import LandingPage from './views/Login/Landing-page';
import ForgotPasswordEmailSubmission from './views/Login/ForgotPassword';
import DonorSignUpView from './views/Login/DonorSignup';
import TeacherSignUpView from './views/Login/DonorSignup';
import WatermarkComponent from './views/Login/watermark';
import ItemUpload from './components/shared/NavBar/itemUpload';
import Navbar from './components/shared/NavBar/navbar';
import ProductSearchView from './components/Account-Settings/ProductSearch';
import SettingsView from './components/Account-Settings/Settings';
import MessageView from './components/Account-Settings/Messages';
import FlagsRaisedView from './components/Account-Settings/FlagsRaised';
import ReportAndAnalyticsView from './components/Account-Settings/ReportAndAnalytics';
import PostManagementView from './components/Account-Settings/PostManagement';
import UserManagementView from './components/Account-Settings/UserManagement';
import DashboardView from './components/Account-Settings/Dashboard';

function App() {
	//used to handle the navbar and header state
  const [headerState, setHeaderState] = useState('loggedout');
  const [navBarState, setNavBarState] = useState('none');
  //handle header state
  const handleSetHeaderState = (newState) => {
    setHeaderState(newState);
  };
   //update header state
  const updateHeaderState = () => {
    const isHomePage = window.location.pathname === '/home';
    const isLanding = window.location.pathname === '/';
    const isDonor = window.location.pathname === '/DonorSignUp';
	const isTeacher = window.location.pathname === '/TeacherSignup';
	const isSettings = window.location.pathname === '/Settings';
	const isProductSearch = window.location.pathname === '/ProductSearch';
	const isMessages = window.location.pathname === '/Messages';
	const isFlagsRaised = window.location.pathname === '/FlagsRaised';
	const isReportAndAnalytics = window.location.pathname === '/ReportAndAnalytics';
	const isPostManagement = window.location.pathname === '/PostManagement';
	const isUserManagement = window.location.pathname === '/UserManagement';
	const isDashboard = window.location.pathname === '/Dashboard';
	
    //logic checking the path of the page to render the correct header/navbar
    if (isHomePage) {
      setHeaderState('loggedin');
      setNavBarState('Admin');
    } else if (isLanding) {
      setHeaderState('loggedout');
      setNavBarState('none');
    } else if (isDonor) {
      console.log('isDonor is true');
      setHeaderState('none');
	} else if (isTeacher) {
	  console.log('isTeacher is true');
	  setNavBarState('none');
	  setHeaderState('none');	  
    } else if (isSettings) {
      setHeaderState('loggedin');
      setNavBarState('Donor');
    } else if (isProductSearch) {
	  setNavBarState('Teacher');
	  setHeaderState('loggedin');
	}else if (isMessages || (setNavBarState === 'Teacher' || setNavBarState === 'Donor' || setNavBarState === 'Admin')) {
     setHeaderState('loggedin');
	}else if (isReportAndAnalytics || isPostManagement || isUserManagement || isFlagsRaised || isDashboard) {
	  setNavBarState('Admin');
	  setHeaderState('loggedin');
	}
  };
  // Update header state when the component mounts
  useEffect(() => {
    updateHeaderState();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	// eslint-disable-next-line
  }, []);
  // Listen for changes in the route and update header state
  useEffect(() => {
    updateHeaderState();
	// eslint-disable-next-line
  }, [window.location.pathname]);
  // Listen for the popstate event to handle back button clicks
  useEffect(() => {
    const handlePopstate = () => {
      updateHeaderState();
    };
    //event listener for the pop state/ fixes hot reloading of the page causing the state to freak out
    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate); //remove event listener
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
        <Route path="/TeacherSignup" element={<TeacherSignUpView />} />
        <Route path="/ForgotPassword" element={<ForgotPasswordEmailSubmission />} />
		<Route path="/itemUpload" element={<ItemUpload />} />
		<Route path="/Settings" element={<SettingsView />} />
		<Route path="/ProductSearch" element={<ProductSearchView />} />
		<Route path="/Messages" element={<MessageView />} />
		<Route path="/FlagsRaised" element={<FlagsRaisedView />} />
		<Route path="/ReportAndAnalytics" element={<ReportAndAnalyticsView />} />
		<Route path="/PostManagement" element={<PostManagementView />} />
		<Route path="/UserManagement" element={<UserManagementView />} />
		<Route path="/Dashboard" element={<DashboardView />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;
