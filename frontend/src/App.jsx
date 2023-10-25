import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';

import { msalConfig } from './authConfig';
import Header from './components/shared/Header/Header'; // Import the Header component
import './components/shared/Header/Header.css'; // Import the CSS file for the Header component
// import NavBar from './NavBar/navbar'; // Commented out for now

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  useEffect(() => {
    console.log(window.location);
  }, []); // This will run the effect only once, similar to componentDidMount

  return (
    <Router> {/* Wrap the entire app with the Router */}
      <MsalProvider instance={msalInstance}>
        <Header showSearch={true} user={{ firstName: 'John' }} /> {/* Render the Header component */}
        {/* <NavBar />  Render the NavBar component */}
        {/* Define your routes here */}
      </MsalProvider>
    </Router>
  );
}

export default App;
