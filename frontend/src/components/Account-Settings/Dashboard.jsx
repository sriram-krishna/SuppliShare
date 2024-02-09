import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import './dashboardStyles.css';
import { BlobServiceClient } from '@azure/storage-blob';

const DashboardView = () => {
  const [imageCount, setImageCount] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const containerUrl = 'https://supplishareblobstorage.blob.core.windows.net';
        const sasToken = 'sp=racwdl&st=2024-02-04T23:41:44Z&se=2024-02-07T07:41:44Z&skoid=9c781b40-6f43-4d2b-b39c-59aeaa77066c&sktid=f3d96fbf-2b4f-454d-ae08-e2ffd89b051f&skt=2024-02-04T23:41:44Z&ske=2024-02-07T07:41:44Z&sks=b&skv=2022-11-02&sv=2022-11-02&sr=c&sig=uV4lAmLR7AWQEb0zJtE%2Bxb2u30%2FoDt2lBNxAJbe0DNQ%3D';

        const blobServiceClient = new BlobServiceClient(`${containerUrl}?${sasToken}`);
        const containerClient = blobServiceClient.getContainerClient('sstest');

        const urls = [];
        for await (const blobItem of containerClient.listBlobsFlat()) {
          const blobUrl = `${containerUrl}/sstest/${blobItem.name}?${sasToken}`;
          urls.push(blobUrl);
        }

        setImageUrls(urls);
        setImageCount(urls.length);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    const fetchUserCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/user-count'); 

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserCount(data.userCount);
      } catch (error) {
        console.error('Error fetching user count:', error);
        setUserCount('Error');
      }
    };

    fetchImageUrls();
    fetchUserCount();
  }, []);

  return (
    <div className="dashboard-container">
      <Paper elevation={4} className="dashboard-paper dashboard-paper-first">
        <Typography variant="h6" component="div" className="dashboard-typography" gutterBottom>
          User Count
        </Typography>
        <Typography variant="h4">{userCount !== null ? userCount : 'Loading...'}</Typography>
      </Paper>

      <Paper elevation={4} className="dashboard-paper">
        <Typography variant="h6" component="div" className="dashboard-typography" gutterBottom>
          Image Count
        </Typography>
        <Typography variant="h4">{imageCount}</Typography>
      </Paper>
    </div>
  );
};

export default DashboardView;