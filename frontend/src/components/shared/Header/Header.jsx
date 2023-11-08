import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

function Header({ showSearch = true,user, handleSetLoggedIn, loggedIn }) {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSignIn = () => {
        handleSetLoggedIn("loggedout");
		loggedIn("loggedout");
    };

    return (
        <div className="header">
            {loggedIn === "loggedin" && (
                <>
                    {showSearch ? (
                        <>
                            <SearchBar onSearch={term => console.log("Searching for:", term)} />
                            <div>SuppliShare</div>
                            <div className="profile-menu">
                                <span onClick={() => setShowDropdown(!showDropdown)}>
                                    Hello, {user.firstName}
                                </span>
                                {showDropdown && (
                                    <ul className="dropdown-menu">
                                        <li><a href="/profile">Your Profile</a></li>
                                        <li><a href="/orders">Your Orders</a></li>
                                        <li><a href="/logout">Logout</a></li>
                                    </ul>
                                )}
                            </div>
                        </>
                    ) : (
                        <div>Suppli Share(Centered)</div>
                    )}
                </>
            )}
            {loggedIn === "loggedout" && (
                <>
                    {showSearch ? (
                        <>
                            <SearchBar onSearch={term => console.log("Searching for:", term)} />
                            <div style={{ paddingLeft: '150px' }}>SuppliShare</div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '10px', color: 'black', fontFamily: 'Trebuchet MS' }}>How It Works</p>
                                <button
                                    style={{
                                        backgroundColor: '#ff9b82',
                                        borderRadius: '1.5rem',
                                        width: '125px',
                                        padding: '0.5rem 1rem',
                                        textAlign: 'center',
                                        color: 'white',
                                        height: '45px'
                                    }}
                                     // Call the handleSignIn function when the button is clicked
                                >
                                    Sign In
                                </button>
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {/* SuppliShare (Centered) */}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Header;
