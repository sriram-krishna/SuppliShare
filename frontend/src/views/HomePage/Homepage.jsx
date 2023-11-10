import React from 'react'
import { useState } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';
const Homepage = () => {
    return (
        <div>
            <body className='Go-to-AccountSettings'>
                {/* <Link to="../components/Account-Settings/Home">Click here to go to Account Settings</Link>  */}
            </body>
            <button>
            <Link to="frontend\src\components\Account-Settings\Home.js">Click here to go to Account Settings</Link> 
            </button>
        </div>
    )
}

export default Homepage;