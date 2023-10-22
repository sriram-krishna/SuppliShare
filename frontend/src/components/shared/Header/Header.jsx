import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';  // Assuming you have a Button component, import it
import './Header.css';

function Header({ showSearch = true, user }) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="header">
            {showSearch ? (
                <>
                    <div>SuppliShare Logo</div>
                    <SearchBar onSearch={term => console.log("Searching for:", term)} />
                    {user ? (
                        <div className="profile-menu">
                            <span onClick={() => setShowDropdown(!showDropdown)}>
                                Hello, {user.firstName}
                            </span>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    <a href="/profile">Your Profile</a>
                                    <a href="/orders">Your Orders</a>
                                    <a href="/logout">Logout</a>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button href="../../Auth/login" type="primary">Sign In</Button>
                    )}
                </>
            ) : (
                <div>SuppliShare Logo (Centered)</div>
            )}
        </div>
    );
}

export default Header;
