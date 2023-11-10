import React from 'react';
//import LoginComponent from '../../components/Auth/Login';
import './Login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function DonorSignUpView() {
    
    return (
        <div className="login-view-wrapper">
            <header className="login-view-header">
              <center style={{ color: '#ff9b82', fontSize: '2.5rem', fontFamily: 'fantasy' }}>DONOR</center>
            </header>
            <main className="login-view-main">
                <div className='centered'>
                    <div id="api"></div>
                </div>
            </main>
        </div>
    );
}
// function redirectToLogin()
// {
//     var url = "/Login";
//     window.location.href= url;
// }
export default DonorSignUpView;
