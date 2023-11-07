import React, { useState } from 'react';
import './navbar.css'; // import the CSS file
import { BiSolidDashboard, BiSolidUser, BiFlag, BiSolidReport, BiCog } from "react-icons/bi";

export default function Navbar() {
  const [role, setRole] = useState("Donor"); // Default role is set to "Admin"

  return (
    <div className="navigationHeight">
      {role === "Admin" && (
        <nav className="nav">
          <ul>
            <li><a href="Dashboard"><BiSolidDashboard className="BiSolidDashboard" />
                Dashboard
              </a>
            </li>
            <li><a href="UserManagement"><BiSolidUser className="BiSolidUser" />
                User Management
              </a>
            </li>
            <li><a href="PostManagement"><BiSolidUser className="BiSolidUser" />
                Post Management
              </a>
            </li>
            <li><a href="ReportAndAnalytics"><BiSolidReport className="BiSolidReport" />
                Report And Analytics
              </a>
            </li>
            <li><a href="FlagsRaised"><BiFlag className="BiFlag" />
                Flags Raised
              </a>
            </li>
            <li><a href="Settings"><BiCog className="BiCog" />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      )}

      {role === "Teacher" && (
        <nav className="nav">
          <ul>
            <li><a href="Settings"><BiCog className="BiCog" />
                Settings
              </a>
            </li>
            <li><a href="ProductSearch"><BiCog className="BiCog" />
                Product Search
              </a>
            </li>
            <li><a href="Messages"><BiCog className="BiCog" />
                Messages
              </a>
            </li>
          </ul>
        </nav>
      )}

            {role === "Donor" && (
        <nav className="nav">
          <ul>
            <li><a href="Settings"><BiCog className="BiCog" />
                Settings
              </a>
            </li>
            <li><a href="ProductSearch"><BiCog className="BiCog" />
                Item Upload
              </a>
            </li>
            <li><a href="Messages"><BiCog className="BiCog" />
                Messages
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
