import React from 'react';
//import LoginComponent from '../../components/Auth/Login';
import './Login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom'
//import Header from './components/shared/Header/Header'
function ForgotPasswordEmailSubmission() {
    
    return (
        <div className="login-view-wrapper">
            <header className="login-view-header">
                <h1 className="login-view-app-title">SuppliShare</h1>
            </header>
            <main className='ForgotPasswordEmailSubmit'>
                <div className='centered'>
                    <div id="api"></div>
                </div>
            </main>
        </div>
    );
}
export default ForgotPasswordEmailSubmission;