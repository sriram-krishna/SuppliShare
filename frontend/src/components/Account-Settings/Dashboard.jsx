import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import './dashboardStyles.css'; // Import the external CSS file

const DashboardView = () => {
  const userCount = 100;
  const imageCount = 500;

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