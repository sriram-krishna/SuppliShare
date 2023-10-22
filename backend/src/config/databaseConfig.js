require('dotenv').config();

const { Client } = require('pg');
const fs = require('fs');

const database = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    ca: fs.readFileSync(process.env.CA_CERT_PATH),
    rejectUnauthorized: true
  }
});

database.connect((err) => {
  if (err) {
      console.error('Failed to connect to the database.', err.stack);
  } else {
      console.log('Connected to the PostgreSQL database.');
  }
});


module.exports = database;
