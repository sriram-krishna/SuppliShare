import React from 'react';
import { Link } from 'react-router-dom';
import { BiSolidDashboard, BiSolidUser, BiFlag, BiSolidReport, BiCog } from "react-icons/bi";
import "./navbar.css";

const Navbar = ({ navBarState }) => {
  return (
    <div className="navigationHeight">
      {navBarState === "Admin" && (
        <nav className="nav">
          <ul>
            <li>
              <Link to="/Dashboard">
                <BiSolidDashboard className="BiSolidDashboard" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/UserManagement">
                <BiSolidUser className="BiSolidUser" />
                User Management
              </Link>
            </li>
            <li>
              <Link to="/PostManagement">
                <BiSolidUser className="BiSolidUser" />
                Post Management
              </Link>
            </li>
            <li>
              <Link to="/ReportAndAnalytics">
                <BiSolidReport className="BiSolidReport" />
                Report And Analytics
              </Link>
            </li>
            <li>
              <Link to="/FlagsRaised">
                <BiFlag className="BiFlag" />
                Flags Raised
              </Link>
            </li>
            <li>
              <Link to="/Settings">
                <BiCog className="BiCog" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {navBarState === "Teacher" && (
        <nav className="nav">
          <ul>
            <li>
              <Link to="/Settings">
                <BiCog className="BiCog" />
                Settings
              </Link>
            </li>
            <li>
              <Link to="/ProductSearch">
                <BiCog className="BiCog" />
                Product Search
              </Link>
            </li>
            <li>
              <Link to="/Messages">
                <BiCog className="BiCog" />
                Messages
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {navBarState === "Donor" && (
        <nav className="nav">
          <ul>
            <li>
              <Link to="/Settings">
                <BiCog className="BiCog" />
                Settings
              </Link>
            </li>
            <li>
              <Link to="/itemUpload">
                <BiCog className="BiCog" />
                Item Upload
              </Link>
            </li>
            <li>
              <Link to="/Messages">
                <BiCog className="BiCog" />
                Messages
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {navBarState === "none" && (
        <p></p>
      )}
    </div>
  );
};

export default Navbar;
