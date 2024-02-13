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

async function checkUserRole(userId) {
  const client = await pool.connect();
  try {
    const query = "SELECT role FROM Users WHERE userId = $1";
    const res = await client.query(query, [userId]);
    if (res.rows.length > 0 && res.rows[0].role === "Donor") {
      return true;
    } else {
      throw new Error(userId);
    }
  } finally {
    client.release();
  }
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
    context.error("Error calling OpenCage API:", error);
  }
}

async function createItem(itemDetails) {
  const client = await pool.connect();
  try {
    const query = `
        INSERT INTO Items (UserID, Name, Type, Description, ZipCode, Status, Latitude, Longitude) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING ItemID;`;
    const values = [
      itemDetails.UserID,
      itemDetails.name,
      itemDetails.type,
      itemDetails.description,
      itemDetails.zipCode,
      itemDetails.status,
      itemDetails.latitude,
      itemDetails.longitude,
    ];
    const res = await client.query(query, values);
    return res.rows[0].ItemID;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

app.http("item", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`HTTP function processed request for URL "${request.url}"`);

    const itemData = await request.json();

    const apiKey = process.env["OPENCAGE_API_KEY"];

    const postalCode = itemData.postalCode;

    itemData.status = "Pending";

    let responseBody;
    context.log(itemData.userId);

    try {
      await checkUserRole(itemData.userId);
    } catch (error) {
      context.error(error);
      return {
        status: 401,
        body: "Unauthorized",
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    try {
      const itemGeoData = await getGeoData(postalCode, apiKey);

      itemData.Latitude = itemGeoData.Latitude;
      itemData.Longitude = itemGeoData.Longitude;

      const itemId = await createItem(itemData);

    } catch (error) {
      context.error("Failed to insert item details:", error);
      responseBody = {
        version: "1.0.0",
        status: 500,
        Message: `An error occurred: ${error.message}`,
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
