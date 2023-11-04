import React from 'react';
import LoginComponent from '../../components/Auth/Login';
import './Login.css';
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <div className="landingPage-wrapper">
            <header className="landingPage-header">
                <h1 className="landingPage-view-app-title">SuppliShare</h1>
            </header>
            <main className="LandingPage-main"> 
                
                <div className='centered'>
                {/* <LoginComponent /> */}
                {/* <button class="CreateNewAccount" >Click here to sign up!</button> 
                <button class="LoginButton" style={ {background:'#d782ff'}}><a href="/components/Account-Settings/Home"> </a>Already have an acoount? Click here to sign in!</button> */}
                
                <button style={{ backgroundColor: '#82c3ff', width: '120px', height: '40px', fontFamily: 'Trebuchet MS', borderRadius: '15px', marginBottom: '10px', color: 'white' }}>Click here to sign up!</button>
                <Link to="/Login" className='login-Link'>
                <button style={{ backgroundColor: '#d782ff', width: '120px', height: '40px', fontFamily: 'Trebuchet MS', borderRadius: '15px', color: 'white'}} on>Click here to log-in</button>
                </Link>
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
export default LandingPage;
