// LandingPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LandingPage({ handleSetHeaderState, handleSetLoggedIn }) {
    const navigation = useNavigate();

    const handleDonorSignUpClick = () => {
        handleSetHeaderState('none');
        navigation('/DonorSignUp');
    };

    return (
        <div className="landingPage-wrapper">
            <header className="landingPage-header">
                <h1 className="landingPage-view-app-title">SuppliShare</h1>
            </header>
            <main className="LandingPage-main">
                <div className='centered'>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                        <h1 style={{ fontFamily: 'Fantasy', color: 'black', fontSize: '32px' }}>Your Home For Help!</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                            <Link to="/DonorSignUp" className='login-Link'>
                                <button style={{ backgroundColor: '#82c3ff', width: '120px', height: '40px', fontFamily: 'Trebuchet MS', borderRadius: '15px', marginBottom: '10px', color: 'white' }} onClick={handleDonorSignUpClick}>Sign Up as a Donor</button>
                            </Link>
                            <Link to="/TeacherSignUp" className='login-link'>
                                <button style={{ backgroundColor: '#d782ff', width: '120px', height: '40px', fontFamily: 'Trebuchet MS', borderRadius: '15px', color: 'white' }}onClick={handleDonorSignUpClick}>Sign Up as a Borrower</button>
                            </Link>
                            <Link to="/Login" className='login-Link'>
                                <button style={{ backgroundColor: '#32CD32', width: '120px', height: '40px', fontFamily: 'Trebuchet MS', borderRadius: '15px', color: 'white' }}>Click here to log-in</button>
                            </Link>
                            <Link to="./HomePage/Homepage">
                                <button style={{ backgroundColor: '#32CD32', width: '120px', height: '40px', fontFamily: 'Trebuchet MS', borderRadius: '15px', color: 'white' }}>Click here to go to Account Settings</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LandingPage;
