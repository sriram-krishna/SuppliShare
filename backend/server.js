require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { Pool } = require('pg');

require('dotenv').config(); // This line should be at the very top

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false 
  }
});


const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/registeruser', async (req, res) => {
  const authorizationCode = req.query.code;

  if (authorizationCode) {
    console.log('Authorization Code:', authorizationCode);

    try {
      const tokens = await exchangeCodeForTokens(authorizationCode);
      const idTokenClaims = decodeToken(tokens.id_token);
      console.log('ID Token Claims:', idTokenClaims);

      await insertUserData(idTokenClaims);

      res.send('Tokens received and logged. Check the console.');
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Error processing the authorization code.');
    }
  } else {
    res.status(400).send('No authorization code provided.');
  }
});

async function insertUserData(claims) {
  const client = await pool.connect();

  try {
    const insertQuery = `
      INSERT INTO Users (FirstName, LastName, Email, Role, LastLoginDate, AzureObjectId)
      VALUES ($1, $2, $3, $4, to_timestamp($5), $6)
      ON CONFLICT (AzureObjectId) DO 
      UPDATE SET FirstName = EXCLUDED.FirstName, LastName = EXCLUDED.LastName, LastLoginDate = EXCLUDED.LastLoginDate;
    `;
    const values = [
      claims.given_name,
      claims.family_name,
      claims.emails[0],
      'Admin',
      Math.floor(claims.auth_time),
      claims.oid,
    ];
    await client.query(insertQuery, values);
  } catch (error) {
    console.error('Database Insert Error:', error);
    throw error; // Rethrow the error to handle it in the calling function
  } finally {
    client.release();
  }
}


async function exchangeCodeForTokens(authorizationCode) {
  const tokenEndpoint = process.env.B2C_TOKEN_ENDPOINT;
  const clientID = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET; // Keep this secure. You might not need this depending on your Azure AD B2C setup.
  const redirectUri = 'http://localhost:3000/registeruser';

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientID,
      code: authorizationCode,
      redirect_uri: redirectUri,
      client_secret: clientSecret, // If your flow doesn't require this, you can remove it.
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error('Failed to exchange authorization code for tokens: ' + errorDetails);
  }

  return response.json();
}

function decodeToken(token) {
  const payload = token.split('.')[1];
  const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
  return JSON.parse(decodedPayload);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
