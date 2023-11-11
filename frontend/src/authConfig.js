import { LogLevel } from "@azure/msal-browser";

export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_susi",
  },
  authorities: {
    signUpSignIn: {
      authority:
        "https://SuppliShare.b2clogin.com/SuppliShare.onmicrosoft.com/B2C_1_susi",
    },
  },
  authorityDomain: "SuppliShare.b2clogin.com",
};

// MSAL Configuration
export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,  // Using the environment variable here
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: "/",
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            console.log(message);
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "email"], // Basic OIDC scopes
};
