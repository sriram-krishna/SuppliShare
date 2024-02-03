import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import './dashboardStyles.css'; // Import the external CSS file
import { BlobServiceClient } from '@azure/storage-blob';

const DashboardView = () => {
const [imageCount, setImageCount] = useState(0);
const [imageUrls, setImageUrls] = useState([]);
useEffect(() => {
    
    const fetchImageUrls = async () => {
      try {
        const containerUrl = 'https://supplishareblobstorage.blob.core.windows.net';
        const sasToken = 'sp=rwl&st=2024-02-03T14:50:18Z&se=2024-02-04T22:50:18Z&skoid=9c781b40-6f43-4d2b-b39c-59aeaa77066c&sktid=f3d96fbf-2b4f-454d-ae08-e2ffd89b051f&skt=2024-02-03T14:50:18Z&ske=2024-02-04T22:50:18Z&sks=b&skv=2022-11-02&sv=2022-11-02&sr=c&sig=suTOcAysssrri%2B9jwdThOvSPykj4ar4ULc4mgAXK%2FuQ%3D';

        console.log('Fetching images from:', containerUrl);

        const blobServiceClient = new BlobServiceClient(containerUrl + '?' + sasToken);
        const containerClient = blobServiceClient.getContainerClient('sstest');

        const urls = [];
        for await (const blobItem of containerClient.listBlobsFlat()) {
          // Use the correct blob URL format with the SAS token
          const blobUrl = `${containerUrl}/sstest/${blobItem.name}?${sasToken}`;
          urls.push(blobUrl);
        }

        setImageUrls(urls);
        setImageCount(urls.length);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImageUrls();
  }, []);
  const userCount = 100;

  return (
    <div className="dashboard-container">
      <Paper elevation={4} className="dashboard-paper dashboard-paper-first">
        <Typography variant="h7" component="div" className="dashboard-typography" gutterBottom>
          User Count
        </Typography>
        <Typography variant="h4">{userCount}</Typography>
      </Paper>

      <Paper elevation={4} className="dashboard-paper">
        <Typography variant="h6" component="div" className="dashboard-typography" gutterBottom>
          Image Count
        </Typography>
        <Typography variant="h6">{imageCount}</Typography>
      </Paper>
    </div>
  );
};

export default DashboardView;