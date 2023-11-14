import React from 'react';
import '../Login/Login.css';
import { Link } from 'react-router-dom';

function AdminSkeletonHub() {
    return (
        <div className='centered'>
            <p>
                <Link to="/AdminPostManagement">Click here to manage item postings</Link><br></br>
                <Link to="/AdminUserManagement">Click here to manage users</Link><br></br>
                <Link to="/FlagManager">Click here to view flags raised</Link><br></br>
                <Link to="/reportAnalytics">Click here for report analytics</Link>
            </p>
        </div>
    );
}
export default AdminSkeletonHub;