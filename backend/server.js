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
app.post('/uploadimage', upload.array('image'), async (req, res) => {
  try {
    const { title, description, zip } = req.body;

    if (!title || !description || !zip) {
      return res.status(400).send('Title and description and zip are required.');
    }

    const files = req.files;
    const ItemType = title;

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

    await insertImageDetails(ItemType, description, zip, blobUrls );

    // Modify the response to include details about the uploaded data
    res.send({
      message: 'Title and description received successfully. Files uploaded successfully.',
      uploadedData: {
        title,
        description,
		zip,
        urls: blobUrls,
		
      },
    });

 

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error during file upload.');
  }
});




async function insertImageDetails(itemType, description, zipcode, blobUrl) {
  const client = await pool.connect();

  try {
    const trimmedBlobUrl = blobUrl.map(url => url.replace(/^\{|\}$/g, ''));

    const insertQuery = `
      INSERT INTO Items (ItemType, Description, zipcode, ItemPictureURL)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [itemType, description, zipcode, trimmedBlobUrl];
    await client.query(insertQuery, values);

    // Update existing records to trim itempictureurl
    const updateQuery = `
      UPDATE Items
      SET ItemPictureURL = TRIM(BOTH '"{}"' FROM ItemPictureURL)
    `;
    await client.query(updateQuery);

    return {
      success: true,
      message: `Successfully uploaded backend insertimagedetails ItemType: ${itemType}, Description: ${description}, zipcode: ${zipcode}, ItemPictureURL: ${trimmedBlobUrl}`,
      itemType,
      description,
      blobUrl: trimmedBlobUrl,
      zipcode,
    };
  } catch (error) {
    console.error('Database Insert Error:', error);
    throw new Error('Error during database insertion.');
  } finally {
    // Release the client back to the pool
    client.release();
  }
}



// Endpoint to get a list of items
app.get('/items', async (req, res) => {
  try {
    const client = await pool.connect();
    const query = 'SELECT ItemType, Description, zipcode, ItemPictureURL FROM Items';
    const { rows } = await client.query(query);

    client.release();

    res.status(200).json(rows); // Send the fetched rows as JSON response
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
    const queryResult = await client.query('SELECT ItemPictureURL FROM Items WHERE Status = $1', ['Accepted']); 
    client.release();

    const imageUrls = queryResult.rows.map(row => row.itempictureurl);
    res.status(200).json(imageUrls);
  } catch (error) {
    console.error('Error fetching image URLs:', error);
    res.status(500).send('Failed to retrieve image URLs');
  }
});

app.get('/api/admin/user-count', async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT COUNT(*) FROM Users');
    const userCount = queryResult.rows[0].count;
    res.status(200).json({ userCount });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).send('Failed to retrieve user count');
  }
});

async function deletePost(itemType) {
  try {
    const query = {
      text: 'DELETE FROM Items WHERE ItemType = $1',
      values: [itemType],
    };
    const result = await pool.query(query);
    return result.rowCount; // Return the number of rows deleted
  } catch (error) {
    throw new Error('Error deleting post: ' + error.message);
  }
}

app.delete('/deletePost/:itemType', async (req, res) => {
  const { itemType } = req.params; // Extract the itemType from the request parameters
  try {
    const deleteCount = await deletePost(itemType);
    if (deleteCount > 0) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ error: 'No item found with the specified itemType' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});
app.delete('/deletePostById/:itemid', async (req, res) => {
  const { itemid } = req.params; // Extract the itemId from the request parameters
  try {
    const deleteCount = await deletePostById(itemid);
    if (deleteCount > 0) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ error: 'No item found with the specified itemId' });
    }
  } catch (error) {
    console.error('Error deleting post by ID:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

async function deletePostById(itemId) {
  try {
    console.log('Received itemId:', itemId);

    // Parse the itemId as an integer
    const itemIdInt = parseInt(itemId, 10);
    console.log('Parsed itemId:', itemIdInt);

    // Check if the parsed itemId is a valid integer
    if (isNaN(itemIdInt)) {
      throw new Error('Invalid itemId');
    }

    const query = {
      text: 'DELETE FROM Items WHERE itemid = $1',
      values: [itemIdInt],
    };
    const result = await pool.query(query);
    return result.rowCount; // Return the number of rows deleted
  } catch (error) {
    throw new Error('Error deleting post by ID: ' + error.message);
  }
}



app.get('/getItemId/:itemType', async (req, res) => {
  const { itemType } = req.params; // Extract the itemType from the request parameters
  try {
    // Query to select the itemid associated with the specified itemType
    const selectQuery = {
      text: 'SELECT itemid FROM Items WHERE ItemType = $1',
      values: [itemType],
    };

    const client = await pool.connect();
    const selectResult = await client.query(selectQuery);
    const itemId = selectResult.rows[0]?.itemid; // Get the itemid from the query result

    if (!itemId) {
      return res.status(404).json({ error: 'No item found with the specified itemType' });
    }

    res.status(200).json({ itemId });
  } catch (error) {
    console.error('Error retrieving item ID:', error);
    res.status(500).json({ error: 'Failed to retrieve item ID' });
  }
});

app.get('/imageCount', async (req, res) => {
  try {
    // Query to count the number of images in the ItemPictureURL column
    const countQuery = {
      text: 'SELECT COUNT(*) FROM Items WHERE ItemPictureURL IS NOT NULL',
    };

    // Execute the query using the database connection pool
    const client = await pool.connect();
    const countResult = await client.query(countQuery);

    // Extract the count from the query result
    const imageCount = countResult.rows[0]?.count || 0;

    // Return the count as JSON in the response
    res.status(200).json({ imageCount });
  } catch (error) {
    console.error('Error retrieving image count:', error);
    res.status(500).json({ error: 'Failed to retrieve image count' });
  }
});


  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});