const { app } = require("@azure/functions");
require("dotenv").config();
const fetch = require("node-fetch");

app.http("susi_db_bridge", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    if (request.method === "GET") {
      const authorizationCode = request.query.code;
      if (authorizationCode) {
        return await handleAuthorizationCode(authorizationCode, context);
      } else {
        return { status: 400, body: "No authorization code provided." };
      }
    }

    // Handle other requests
    const name = request.query.name || (await request.text()) || "world";
    return { body: `Hello, ${name}!` };
  },
});

async function handleAuthorizationCode(authorizationCode, context) {
  context.log("Authorization Code:", authorizationCode);

  try {
    const tokens = await exchangeCodeForTokens(authorizationCode);
    const idTokenClaims = decodeToken(tokens.id_token);
    context.log("ID Token Claims:", idTokenClaims);

    return { body: "Tokens received and logged. Check the console." };
  } catch (error) {
    context.log("Error:", error.message);
    return { status: 500, body: "Error processing the authorization code." };
  }
}

async function exchangeCodeForTokens(authorizationCode) {
  const tokenEndpoint = process.env.B2C_TOKEN_ENDPOINT;
  const clientID = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = "http://localhost:3000/registeruser";

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientID,
      code: authorizationCode,
      redirect_uri: redirectUri,
      client_secret: clientSecret,
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(
      "Failed to exchange authorization code for tokens: " + errorDetails
    );
  }

  return response.json();
}

function decodeToken(token) {
  const payload = token.split(".")[1];
  const decodedPayload = Buffer.from(payload, "base64").toString("utf-8");
  return JSON.parse(decodedPayload);
}

module.exports = app;
