import React from 'react';
//import LoginComponent from '../../components/Auth/Login';
import './Login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom'

function ForgotPasswordEmailSubmission() {
    const [email, setEmail] = useState("");
    function submit(event) {
        event.preventDefault() //Prevents default behavior of the form when trying to submit
    }
    return (
        <div className="login-view-wrapper">
            <header className="login-view-header">
                <h1 className="login-view-app-title">SuppliShare</h1>
            </header>
            <main className='ForgotPasswordEmailSubmit'>
                <div className='centered'>
                    <form /*className='login-page'*/>
                        <label>Please enter your email: </label><br />
                        <input type="text" id="Email" onChange={(e) => setEmail(e.target.value)} />
                    </form>
                    <input type="submit" value="Submit" />
                </div>
            </main>
        </div>
    );
}
export default ForgotPasswordEmailSubmission;