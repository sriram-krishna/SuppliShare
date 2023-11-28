// NavBar.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../../../assets/images/brand-logo.png";
import profile from "../../../assets/images/profilepic/profile-pic.jpg";
import { SearchBar } from "../SearchBar/SearchBar";

import { useMsal } from "@azure/msal-react";

export const NavBar = () => {
  const { instance } = useMsal();

  const handleLoginClick = () => {
    instance.loginRedirect().catch((e) => {
      console.error(e);
    });
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "User Name",
    profilepic: profile,
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile({ name: "", profilepic: "" });
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
      <button onClick={handleLoginClick}>Login</button>
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
