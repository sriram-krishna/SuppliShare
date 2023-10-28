import React from 'react';
import LoginComponent from '../../components/Auth/Login';
import './Login.css';

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
                    {/* <button class="CreateNewAccount" type="button">Click here to sign up!</button>
                    <button class="LoginButton" type="button" >Already have an acoount? Click here to sign in!</button> */}
                <button style={{ backgroundColor: '#82c3ff', width: '120px', height: '40px', fontFamily: 'Trebuchet MS', borderRadius: '15px', marginBottom: '10px', color: 'white' }}>Click here to sign up!</button>
                <br></br>
                <button style={{ backgroundColor: '#d782ff', width: '120px', height: '40px', fontFamily: 'Trebuchet MS', borderRadius: '15px', color: 'white' }}>Click here to log-in</button>
                </div>
            </main>These two lines should be put in the landing page
        </div>
    );
}
// function redirectToLogin()
// {
//     var url = "/Login";
//     window.location.href= url;
// }
export default LandingPage;
