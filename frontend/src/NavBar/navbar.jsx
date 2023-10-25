import React from 'react';
import './navbar.css'; // import the CSS file


export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="SuppliShare">SuppliShare</a>
      <ul>
        <li>
          <a href="Dashboard">Dashboard</a>
        </li>
		<li>
          <a href="UserManagement">User Management</a>
        </li>
		<li>
          <a href="PostManagement">Post Management</a>
        </li>
		<li>
          <a href="ReportAndAnalytics">Report And Analytics</a>
        </li>
		<li>
          <a href="FlagsRaised">Flags Raised</a>
        </li>
		<li>
          <a href="Settings">Settings</a>
        </li>
       
      </ul>
    </nav>
  );
}
