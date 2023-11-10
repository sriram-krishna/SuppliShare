import React from 'react';
import ReactDOM from 'react-dom';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import App from './App'; // Assuming your main application component is in App.js
import { msalConfig } from './authConfig';

// Initialize the MSAL application instance
const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  // Provide the MSAL instance to your entire app
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>,
  document.getElementById('root')
);
