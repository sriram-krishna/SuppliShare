// LandingPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WatermarkComponent from './watermark';

function LandingPage({ handleSetHeaderState, handleSetLoggedIn }) {
    const navigation = useNavigate();

    const handleDonorSignUpClick = () => {
        handleSetHeaderState('none');
        navigation('/DonorSignUp');
    };

    const handleBorrowerSignUpClick = () => { // Fix the function name here
        handleSetHeaderState('none');
        navigation('/TeacherSignUp');
    };

    return (
        <div className="landingPage-wrapper">
            <header className="landingPage-header">
                <h1 className="landingPage-view-app-title"></h1>
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
                                <button style={{ backgroundColor: '#d782ff', width: '120px', height: '40px', fontFamily: 'Trebuchet MS', borderRadius: '15px', color: 'white' }} onClick={handleBorrowerSignUpClick}>Sign Up as a Borrower</button>
                            </Link>
                            <Link to="/Login" className='login-Link'>
                                <button style={{ backgroundColor: '#32CD32', width: '120px', height: '40px', fontFamily: 'Trebuchet MS', borderRadius: '15px', color: 'white' }}>Click here to log-in</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LandingPage;
