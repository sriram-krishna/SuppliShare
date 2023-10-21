import React from 'react'
import { Link } from 'react-router-dom'
import './AccountSettings.css';

const Home = () => {
  return (
    <div>
      <header className="Home-header">
        <Link to="/AccountSettings"> Go to Account Settings</Link>
      </header>
    </div>
  )
}

export default Home
