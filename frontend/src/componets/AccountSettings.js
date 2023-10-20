import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AccountSettings = () => {

    function submit(event) {
        event.preventDefault()
        // fetch("http://localhost:5000", {
        //     method: "POST", mode: "cors", body: JSON.stringify({ email: email }), headers: {
        //         Accept: "application/json", "Content-Type": "application/json"
        //     }
        // })
        //     .then(response => response.json())
        //     .then(responseJSON => console.log(responseJSON.message))
    }
    return (
        <div>
            <p>Do you want to change your <Link to ="/editemail">email?</Link></p>
            <p>Do you want to change your <Link to ="/editpassword">password?</Link></p>
            <p>Do you want to change your <Link to ="/editzipcode">zipcode?</Link></p>
            <p>Do you want to change your <Link to ="/editSchool">School Name?</Link></p>
        </div>
    )
}

export default AccountSettings
