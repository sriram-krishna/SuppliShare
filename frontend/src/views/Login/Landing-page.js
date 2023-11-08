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

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                        <h1 style={{ fontFamily: 'Fantasy', color: 'black', fontSize: '32px' }}>Your Home For Help!</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                            <Link to="/DonorSignUp" className='login-Link'>
                                <button style={{ backgroundColor: '#82c3ff', width: '120px', height: '40px', fontFamily: 'Trebuchet MS', borderRadius: '15px', marginBottom: '10px', color: 'white' }}>Sign Up as a Donor</button>
                            </Link>
                            <Link to="/TeacherSignUp" className='login-link'>
                                <button style={{ backgroundColor: '#d782ff', width: '120px', height: '40px', fontFamily: 'Trebuchet MS', borderRadius: '15px', color: 'white' }}>Sign Up as a Borrower</button>
                            </Link>
                            <Link to="/Login" className='login-Link'>
                                <button style={{ backgroundColor: '#32CD32', width: '120px', height: '40px', fontFamily: 'Trebuchet MS', borderRadius: '15px', color: 'white' }} on>Click here to log-in</button>
                            </Link>
                        </div>

                    </div>
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
