import React from 'react';
//import LoginComponent from '../../components/Auth/Login';
import './Login.css';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';

function TeacherSignUpView() {
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [zipcode, setZipcode] = useState("")
    // function submit(event) {
    //     event.preventDefault() //Prevents default behavior of the form when trying to submit
    // }
    return (
        <div className="login-view-wrapper">
            <header className="login-view-header">
              <center style={{ color: '#ff9b82', fontSize: '2.5rem', fontFamily: 'fantasy' }}>TEACHER</center>
            </header>
            <main className="login-view-main">
                <div className='centered'>
                    {/*<LoginComponent /> */}
                    {/* <button class="CreateNewAccount" >Click here to sign up!</button> 
                        <button class="LoginButton" style={ {background:'#d782ff'}}><a href="/components/Account-Settings/Home"> </a>Already have an acoount? Click here to sign in!</button> */}
                    <form autoComplete='off'/*className='login-page'*/>
                        <label>Email: </label><br />
                        {/* <input type="text" id="Email" onChange={(e) => setEmail(e.target.value)} /> */}
                        <label>Password: </label><br />
                        {/* <input type="password" id="password" onChange={(e) => setEmail(e.target.value)}/> */}
                        <label>Zipcode: </label>
                        {/* <input type="number" id="Zipcode" onChange={(e) => setZipcode(e.target.value)} /> */}
                    </form>
                    <input type="submit" value="Submit" />
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
export default TeacherSignUpView;
