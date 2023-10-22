import React from 'react';
import LoginComponent from '../../components/Auth/Login';
import './Login.css';

function LoginView() {
    return (
        <div className="login-view-wrapper">
            <header className="login-view-header">
                <h1 className="login-view-app-title">SuppliShare</h1>
            </header>
            <main className="login-view-main">
                <LoginComponent />
            </main>
        </div>
    );
}

export default LoginView;
