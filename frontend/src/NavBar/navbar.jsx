import React from 'react';
import './navbar.css'; // import the CSS file

export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="SuppliShare">SuppliShare</a>
      <ul>
        <li>
          <a href="/messages">Messages</a>
        </li>
        <li>
          <a href="/settings">Settings</a>
        </li>
        <li>
          <a href="/search">Search</a>
        </li>
      </ul>
    </nav>
  );
}
