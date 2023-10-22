// LoginComponent.jsx

import React from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '../../authConfig'; // Adjust this path to your configuration file

function LoginComponent() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return <button onClick={handleLogin}>Sign In</button>;
}

export default LoginComponent;
