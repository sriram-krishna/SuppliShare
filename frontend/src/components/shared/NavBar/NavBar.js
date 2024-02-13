// NavBar.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../../../assets/images/brand-logo.png";
import profile from "../../../assets/images/profilepic/profile-pic.jpg";
import { SearchBar } from "../SearchBar/SearchBar";

import { useMsal } from "@azure/msal-react";

export const NavBar = () => {
  const { accounts, instance } = useMsal();
  const isLoggedIn = accounts.length > 0;

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [userProfile, setUserProfile] = useState({
    name: "User Name",
    profilepic: profile,
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

    console.log(process.env.REACT_APP_CLIENT_ID);

  const handleLoginClick = () => {
    setIsLoggingIn(true);
    instance.loginRedirect().catch((e) => {
      console.error(e);
    });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (accounts.length > 0) {
      const account = accounts[0];
      setUserProfile({
        name: account.name,
        profilepic: account.profilePic || profile, 
      });
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [accounts]);
  

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/"
    });
  };
  
  const renderLoginOrProfile = () => {
    return isLoggedIn ? (
      <div className="user-profile" onClick={toggleDropdown}>
        <img src={userProfile.profilepic} alt="Profile" />
        {showDropdown && (
          <div className="profile-dropdown" ref={dropdownRef}>
            <div>Profile</div>
            <div>Settings</div>
            <div onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>
    ) : (
      <button onClick={handleLoginClick} disabled={isLoggingIn}>
        Login
      </button>
    );
  };

  return (
    <header className="NavBar">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
      </Link>
      <div className="search-bar-container">
        <SearchBar />
      </div>
      <div className="login-button">{renderLoginOrProfile()}</div>
    </header>
  );
};
