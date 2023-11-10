import React from 'react';
import { useState } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';
const Homepage = () => {
    return (
        <div className="HomePage-wrapper">
            <header className="HomePage-header">
                <h1 className="HomePage-view-app-title"></h1>
            </header>
            <main className="HomePage-main">
                <div className='centered'>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                        <h1>Welcome to SuppliShare</h1>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Homepage;