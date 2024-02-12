const { app } = require("@azure/functions");
const axios = require("axios");
const { Pool } = require("pg");

const decodeCert = (base64Cert) =>
  Buffer.from(base64Cert, "base64").toString("utf-8");

const pool = new Pool({
  host: process.env["PG_HOST"],
  database: process.env["PG_DATABASE"],
  user: process.env["PG_USER"],
  password: process.env["PG_PASSWORD"],
  port: process.env["PG_PORT"],
  ssl: {
    rejectUnauthorized: true,
    ca: decodeCert(process.env["PG_SSL_CERT"]),
  },
});

async function insertUser(userDetails) {
  const client = await pool.connect();
  try {
    const query = `
          INSERT INTO Users (FirstName, LastName, Email, Role, ZipCode, City, State, OrganizationName, SchoolName, GradeLevel, Latitude, Longitude) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING UserID;`;
    const values = [
      userDetails.givenName,
      userDetails.surname,
      userDetails.email,
      userDetails.role,
      userDetails.postalCode,
      userDetails.city,
      userDetails.state,
      userDetails.extension_6be542ad5c7546a4aeeb02cc5031422b_OrganizationName,
      userDetails.extension_6be542ad5c7546a4aeeb02cc5031422b_SchoolName,
      userDetails.extension_6be542ad5c7546a4aeeb02cc5031422b_GradeLevel,
      userDetails.Latitude,
      userDetails.Longitude,
    ];
    const res = await client.query(query, values);
    return res.rows[0].UserID;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  } finally {
    client.release();
  }
}

async function verifyAddress(postalCode, city, state, apiKey) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    postalCode
  )}&key=${apiKey}&limit=1`;

  try {
    const response = await axios.get(url);
    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const result = response.data.results[0];
      const resultCity = result.components.city;
      const resultState = result.components.state;

      return {
        isValid:
          resultCity.toLowerCase() === city.toLowerCase() &&
          resultState.toLowerCase() === state.toLowerCase(),
        city: resultCity,
        state: resultState,
      };
    }
  } catch (error) {
    console.error("Error calling OpenCage API:", error);
    return { isValid: false };
  }
}

function authenticate(username, password) {
  const expectedUsername = process.env["API_USERNAME"];
  const expectedPassword = process.env["API_PASSWORD"];

  return username === expectedUsername && password === expectedPassword;
}

async function getGeoData(postalCode, apiKey) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    postalCode
  )}&key=${apiKey}&limit=1`;

  try {
    const response = await axios.get(url);
    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const result = response.data.results[0];
      const resultLatitude = result.geometry.lat;
      const resultLongitude = result.geometry.lng;

      return {
        Latitude: resultLatitude,
        Longitude: resultLongitude,
      };
    }
  } catch (error) {
    console.error("Error calling OpenCage API:", error);
    return { isValid: false };
  }
}

app.http("user", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`HTTP function processed request for URL "${request.url}"`);

    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return {
        status: 401,
        body: JSON.stringify("Reason: No Authentication Provided."),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    if (!authHeader.startsWith("Basic")) {
      return {
        status: 401,
        body: JSON.stringify("Reason: No Basic Authentication Provided."),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    const base64Credentials = authHeader.substring("Basic ".length).trim();
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");

    if (!authenticate(username, password)) {
      return {
        status: 401,
        body: JSON.stringify("Reason: Invalid username or password."),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    const userData = await request.json();
    const apiKey = process.env["OPENCAGE_API_KEY"];

    const userZip = userData.postalCode;
    const userCity = userData.city;
    const userState = userData.state;

    const verificationResult = await verifyAddress(
      userZip,
      userCity,
      userState,
      apiKey
    );

    userData.extension_6be542ad5c7546a4aeeb02cc5031422b_Role = "Teacher"; //Default Role
    
    let responseBody;

    if (verificationResult.isValid) {
      try {
        const userGeoData = await getGeoData(userZip, apiKey);
        userData.Latitude = userGeoData.Latitude;
        userData.Longitude = userGeoData.Longitude;
        const userId = await insertUser(userData);
        responseBody = {
          version: "1.0.0",
          status: 200,
          action: "Continue",
          userId: userId,
          role: userData.extension_6be542ad5c7546a4aeeb02cc5031422b_Role,
        };
      } catch (error) {
        context.error("Failed to insert user details:", error);
        responseBody = {
          version: "1.0.0",
          status: 200,
          action: "ShowBlockPage",
          userMessage: `An error occurred: ${error.message}`,
        };
      }
    } else {
      responseBody = {
        version: "1.0.0",
        status: 400,
        action: "ValidationError",
        userMessage:
          "Zip code and city or state does not match. Please enter correct zip code and city and state.",
      };
    }

    return {
      status: responseBody.status,
      body: JSON.stringify(responseBody),
      headers: {
        "Content-Type": "application/json",
      },
    };
  },
});
