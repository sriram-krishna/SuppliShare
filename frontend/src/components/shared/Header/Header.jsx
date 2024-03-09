import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../../assets/images/brand-logo.png";
import profile from "../../../assets/images/profilepic/profile-pic.jpg";
import { SearchBar } from "../SearchBar/SearchBar";
import { useMsal } from "@azure/msal-react";
import "./navbar.css";

export const Header = () => {
  const navigate = useNavigate();
  const { accounts, instance } = useMsal();
  const isLoggedIn = accounts.length > 0;
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "User Name",
    profilepic: profile,
    role: "User",
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleLoginClick = () => {
    setIsLoggingIn(true);
    instance.loginRedirect().catch((e) => {
      console.error(e);
      setIsLoggingIn(false);
    });
  };

  const handleSettingsClick = () => {
    const settingsAuthority = `https://supplishare.b2clogin.com/SuppliShare.onmicrosoft.com/B2C_1_acc_settings`;

    instance.loginRedirect({
      scopes: ["openid", "profile"],
      authority: settingsAuthority,
    }).catch((e) => {
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
  
    if (accounts && accounts.length > 0 && accounts[0].idTokenClaims) {
      const account = accounts[0];
      setUserProfile({
        ...userProfile,
        name: account.idTokenClaims.given_name || 'Default Name',
        profilepic: account.idTokenClaims.profile_pic || profile,
        role: account.idTokenClaims['extension_Role'] || 'Teacher',
      });
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accounts]);

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/"
    });
  };

  const RenderLoginOrProfile = () => {
    return isLoggedIn ? (
      <div className="user-profile" onClick={toggleDropdown}>
        <img src={userProfile.profilepic} alt="Profile" />
        {showDropdown && (
          <div className="profile-dropdown" ref={dropdownRef}>
            <div onClick={handleSettingsClick}>Profile</div>
            {userProfile.role === "Admin" && (
              <>
                <div onClick={() => navigateTo("/Dashboard")}>Dashboard</div>
                <div onClick={() => navigateTo("/UserManagement")}>User Management</div>
                <div onClick={() => navigateTo("/PostManagement")}>Post Management</div>
                <div onClick={() => navigateTo("/ReportAndAnalytics")}>Report And Analytics</div>
                <div onClick={() => navigateTo("/FlagsRaised")}>Flags Raised</div>
              </>
            )}
            <div onClick={() => navigateTo("/itemUpload")}>Post Item</div>
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
      <div className="logo" onClick={() => navigateTo("/")}>
        <img src={logo} alt="Logo" />
      </div>
      <div className="search-bar-container">
        <SearchBar />
      </div>
      <div className="login-button">
        <RenderLoginOrProfile />
      </div>
    </header>
  );
};
