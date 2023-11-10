import React, { useState } from 'react';
import './navbar.css'; // import the CSS file
import { BiSolidDashboard, BiSolidUser, BiFlag, BiSolidReport, BiCog } from "react-icons/bi";

export default function Navbar() {
  const [role, setRole] = useState("none"); // Default role is set to "Admin"

  return (
    <div className="navigationHeight">
      {role === "Admin" && (
        <nav className="nav">
          {/* Admin links */}
        </nav>
      )}

      {role === "Teacher" && (
        <nav className="nav">
          {/* Teacher links */}
        </nav>
      )}

      {role === "Donor" && (
        <nav className="nav">
          {/* Donor links */}
        </nav>
      )}

      {role === "none" && (
        <p></p>
      )}
    </div>
  );
}
