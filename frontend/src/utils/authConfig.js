const clientId = process.env.REACT_APP_B2C_CLIENT_ID;
const authority = process.env.REACT_APP_B2C_AUTHORITY;
const knownAuthorities = process.env.REACT_APP_B2C_KNOWN_AUTHORITIES;
const redirectUri = process.env.REACT_APP_B2C_REDIRECT_URI;

const msalConfig = {
  auth: {
    clientId: clientId,
    authority: authority,
    knownAuthorities: [knownAuthorities],
    redirectUri: redirectUri,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export default msalConfig;
