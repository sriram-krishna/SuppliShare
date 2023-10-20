import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <header className="App-header">
        <Link to="/AccountSettings"> Go to Account Settings</Link>
      </header>
    </div>
  )
}

export default Home
