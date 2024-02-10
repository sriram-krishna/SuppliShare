import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import './dashboardStyles.css';

const DashboardView = () => {
  const [imageCount, setImageCount] = useState(0);
  const [userCount, setUserCount] = useState(null);
  const [totalItemsDonated, setTotalItemsDonated] = useState(0);

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

    const fetchTotalItemsDonated = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/userData');

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const { userData } = await response.json();
        const totalDonated = userData.reduce((acc, user) => acc + user.itemsdonated, 0);
        setTotalItemsDonated(totalDonated);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setTotalItemsDonated('Error');
      }
    };

    fetchImageCount();
    fetchUserCount();
    fetchTotalItemsDonated();
  }, []);

  return (
    <div className="dashboard-container">
      <Paper elevation={4} className="dashboard-paper dashboard-paper-first">
        <Typography variant="h6" component="div" className="dashboard-typography" gutterBottom>
          User Count
        </Typography>
        <Typography variant="h4"className="dashboard-typography">{userCount !== null ? userCount : 'Loading...'}</Typography>
      </Paper>

      <Paper elevation={4} className="dashboard-paper">
        <Typography variant="h6" component="div" className="dashboard-typography" gutterBottom>
          Post Count
        </Typography>
        <Typography variant="h4" className="dashboard-typography">{imageCount}</Typography>
      </Paper>

      <Paper elevation={4} className="dashboard-paper">
        <Typography variant="h4" component="div" className="dashboard-typography" gutterBottom>
          Total Items Donated
        </Typography>
        <Typography variant="h4" className="dashboard-typography">{totalItemsDonated}</Typography>
      </Paper>
    </div>
  );
};

export default DashboardView;
