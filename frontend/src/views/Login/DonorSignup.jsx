import React from "react";
import "./Login.css";

function DonorSignUpView() {
  return (
    <div className="login-view-wrapper">
      <header className="login-view-header">
        <center
          style={{
            color: "#ff9b82",
            fontSize: "2.5rem",
            fontFamily: "fantasy",
          }}
        >
          DONOR
        </center>
      </header>
      <body>
        <div id="api"></div>
      </body>
    </div>
  );
}
export default DonorSignUpView;
