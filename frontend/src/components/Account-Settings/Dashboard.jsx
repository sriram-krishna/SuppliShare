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
    const fetchImageCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/imageCount');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const countData = await response.json();
        setImageCount(countData.imageCount);
      } catch (error) {
        console.error('Error fetching image count:', error);
        setImageCount('Error');
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

    fetchImageCount();
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
