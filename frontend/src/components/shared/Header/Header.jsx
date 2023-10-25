import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';
import './Header.css';

function Header({ showSearch = true, user }) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="header">
            {showSearch ? (
                <>
                    <SearchBar onSearch={term => console.log("Searching for:", term)} />
                    <div>SuppliShare Logo</div>
                    {user ? (
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
