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
          <Typography variant="h6">User ID: {user.userid}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Account Status: {user.accountstatus}</Typography>
          <Typography>Role: {user.role}</Typography>
          <Typography>Organization Name: {user.organizationname}</Typography>
          <Typography>Items Donated: {user.itemsdonated}</Typography>
          <Typography>School Name: {user.schoolname}</Typography>
          <Typography>Grade Level: {user.gradelevel}</Typography>
        </Paper>
      ))}
    </div>
  );
};

export default UserManagementView;
