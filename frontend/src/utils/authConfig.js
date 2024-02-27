const msalConfig = {
    auth: {
      clientId: process.env.REACT_APP_CLIENT_ID,
      authority: process.env.REACT_APP_AUTHORITY,
      knownAuthorities: [process.env.REACT_APP_KNOWN_AUTHORITIES],
      redirectUri: process.env.REACT_APP_REDIRECT_URI,
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false,
    },
  };
  
  export default msalConfig;