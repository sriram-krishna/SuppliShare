import React from 'react';
//import LoginComponent from '../../components/Auth/Login';
import './Login.css';


function LoginView() {
    
    return (
        <div className="login-view-wrapper">
            <header className="login-view-header">
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
export default LoginView;
