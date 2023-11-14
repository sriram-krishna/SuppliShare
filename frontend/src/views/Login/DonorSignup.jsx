import React from "react";
import "./Login.css";

function DonorSignUpView() {
  return (
    <div className="login-view-wrapper">
            <header>
              <center style={{ color: '#ff9b82', fontSize: '2.5rem', fontFamily: 'fantasy' }}>Donor</center>
            </header>
            <main className="login-view-main">
                <div className='centered'>
                    {/*<LoginComponent /> */}
                    {/* <button class="CreateNewAccount" >Click here to sign up!</button> 
                        <button class="LoginButton" style={ {background:'#d782ff'}}><a href="/components/Account-Settings/Home"> </a>Already have an acoount? Click here to sign in!</button> */}
                    <form autoComplete='off'>
                        <label>Email: </label><br />
                        <input type="text" id="Email" />
                        <label>Password: </label><br />
                        <input type="password" id="password" />
                        <label>Zipcode: </label>
                        <input type="number" id="Zipcode"  />
                    </form>
                    <input type="submit" value="Submit" />
                </div>
            </main>
        </div>
  );
}
export default DonorSignUpView;
