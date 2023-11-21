// LandingPage.jsx
import React from 'react';
import { Link} from 'react-router-dom';
import './testPage.css'

function TestPage() {
    return (
        <button className='GoogleButton'>
            <span>
                <p className='GoogleText'>
                    <img src="../../assets/images/icons/icon-google.png">
                    </img>Continue with Google
                </p>
            </span>
        </button>
    );
}

export default TestPage;