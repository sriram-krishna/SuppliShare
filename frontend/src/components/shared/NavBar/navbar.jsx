
import './navbar.css'; // import the CSS file
import { BiSolidDashboard, BiSolidUser, BiFlag, BiSolidReport, BiCog } from "react-icons/bi";

export default function Navbar({ navBarState }) {
  // Default role is set to "Admin"

  return (
    <div className="navigationHeight">
      {navBarState  === "Admin" && (
        <nav className="nav">
          <ul>
            <li>
              <a href="Dashboard">
                <BiSolidDashboard className="BiSolidDashboard" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="UserManagement">
                <BiSolidUser className="BiSolidUser" />
                User Management
              </a>
            </li>
            <li>
              <a href="PostManagement">
                <BiSolidUser className="BiSolidUser" />
                Post Management
              </a>
            </li>
            <li>
              <a href="ReportAndAnalytics">
                <BiSolidReport className="BiSolidReport" />
                Report And Analytics
              </a>
            </li>
            <li>
              <a href="FlagsRaised">
                <BiFlag className="BiFlag" />
                Flags Raised
              </a>
            </li>
            <li>
              <a href="Settings">
                <BiCog className="BiCog" />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      )}

      {navBarState  === "Teacher" && (
        <nav className="nav">
          <ul>
            <li>
              <a href="Settings">
                <BiCog className="BiCog" />
                Settings
              </a>
            </li>
            <li>
              <a href="ProductSearch">
                <BiCog className="BiCog" />
                Product Search
              </a>
            </li>
            <li>
              <a href="Messages">
                <BiCog className="BiCog" />
                Messages
              </a>
            </li>
          </ul>
        </nav>
      )}

      {navBarState  === "Donor" && (
        <nav className="nav">
          <ul>
            <li>
              <a href="Settings">
                <BiCog className="BiCog" />
                Settings
              </a>
            </li>
            <li>
              <a href="itemUpload">
			   
                <BiCog className="BiCog" />
                Item Upload
              </a>
            </li>
            <li>
              <a href="Messages">
                <BiCog className="BiCog" />
                Messages
              </a>
            </li>
          </ul>
        </nav>
      )}

      {navBarState === "none" && (
        <p></p>
      )}
    </div>
  );
}