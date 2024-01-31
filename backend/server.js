require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const { Pool } = require('pg');
const cors = require('cors');
const mime = require('mime-types');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up Azure Blob Storage client
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload image to Azure Blob Storage and insert data into the database
app.post('/uploadimage', upload.array('image', 5), async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }

    const blobUrls = await Promise.all(files.map(async (file) => {
      // Check MIME type
      const mimeType = mime.lookup(file.originalname);
      if (!mimeType.startsWith('image/')) {
        throw new Error('Invalid file type. Please upload only images.');
      }

      const blobName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.jpg`; // Use a more unique name if needed
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload the file to Azure Blob Storage
      await blockBlobClient.upload(file.buffer, file.buffer.length);

      return blockBlobClient.url; // Return the Blob Storage URL
    }));

    res.send({ message: 'Files uploaded successfully.', urls: blobUrls });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error during file upload.');
  }
});

// Insert image details into the database
async function insertImageDetails(blobUrl) {
  const client = await pool.connect();

  try {
    const insertQuery = `
      INSERT INTO Items (ItemType, Description, ItemPictureURL)
      VALUES ($1, $2, $3)
    `;
    const values = ['ItemTypeHere', 'DescriptionHere', blobUrl];
    await client.query(insertQuery, values);
  } catch (error) {
    console.error('Database Insert Error:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Endpoint to get a list of items
app.get('/items', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Items');
    client.release();

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Database Query Error:', error);
    res.status(500).send('Error retrieving items from the database');
  }
});

// Endpoint to get items listed by a specific user
app.get('/user-items/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM ListItems WHERE UserID = $1', [userId]);
    client.release();

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Database Query Error:', error);
    res.status(500).send('Error retrieving items for the user');
  }
});

app.get('/items/images', async (req, res) => {
  try {
    const client = await pool.connect();
    const queryResult = await client.query('SELECT ItemPictureURL FROM Items WHERE Status = $1', ['Accepted']); // Modify the query as needed
    client.release();

    const imageUrls = queryResult.rows.map(row => row.itempictureurl);
    res.status(200).json(imageUrls);
  } catch (error) {
    console.error('Error fetching image URLs:', error);
    res.status(500).send('Failed to retrieve image URLs');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
