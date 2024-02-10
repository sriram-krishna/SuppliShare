import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './dashboardStyles.css'; 

const UserManagementView = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/userData');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const { userData } = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard-container"> 
      {userData.map((user, index) => (
        <Paper key={index} elevation={3} className="dashboard-paper"> 
          <Typography variant="h6"className="dashboard-typography">User ID: {user.userid}</Typography>
          <Typography className="dashboard-typography">Email: {user.email}</Typography>
          <Typography className="dashboard-typography">Account Status: {user.accountstatus}</Typography>
          <Typography className="dashboard-typography">Role: {user.role}</Typography>
          <Typography className="dashboard-typography">Organization Name: {user.organizationname}</Typography>
          <Typography className="dashboard-typography">Items Donated: {user.itemsdonated}</Typography>
          <Typography className="dashboard-typography">School Name: {user.schoolname}</Typography>
          <Typography className="dashboard-typography">Grade Level: {user.gradelevel}</Typography>
        </Paper>
      ))}
    </div>
  );
};

export default UserManagementView;
