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
                {/*<LoginComponent /> */}
                <button class="CreateNewAccount" >Click here to sign up!</button> 
                <button class="LoginButton" style={ {background:'#d782ff'}}><a href="/components/Account-Settings/Home"> </a>Already have an acoount? Click here to sign in!</button>
            </main>These two lines should be put in the landing page
        </div>
    );
}
// function redirect()
// {
//     var url = "/Login";
//     window.location.href= url;
// }
export default LoginView;
