export const msalConfig = {
    auth: {
      clientId: "your-client-id",
      authority: "your-b2c-authority",
      knownAuthorities: ["your-b2c-login-authority"],
      redirectUri: "your-redirect-uri",
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true,
    },
  };
  