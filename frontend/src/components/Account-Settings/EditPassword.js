import React, { useState } from 'react'
import './AccountSettings.css';
//import { usePasswordValidation } from "./frontend/Hooks/usePasswordValidation.js";

const EditPassword = () => {
    //const [password, setPassword] = useState("")
    const [userProfile, setUserProfile] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    function submit(event) {
        event.preventDefault()//Prevents default behavior of the form when trying to submit
        fetch("http://localhost:5000/account/change-password", {
            method: "POST", mode: "cors", body: JSON.stringify(userProfile), headers: {
                Accept: "application/json", "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(responseJSON => console.log(responseJSON.message))
    }

    const [error, setError] = useState({
        password: '',
        confirmPassword: ''
    })

    const onInputChange = e => {
        const { name, value } = e.target;
        setUserProfile(prev => ({
            ...prev,
            [name]: value
        }));
        validateInput(e);

    }

    const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (userProfile.confirmPassword && value !== userProfile.confirmPassword) {
                        stateObj["confirmPassword"] = "Passwords do not match";
                    } else {
                        stateObj["confirmPassword"] = userProfile.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (userProfile.password && value !== userProfile.password) {
                        stateObj[name] = "Passwords do not match.";
                    }
                    break;

                default:
                    break;
            }

            return stateObj;
        });
    }

    return (
        <div className='Edit-Passwrd'>
            <form onSubmit={submit}>
                <div className="Form-Group">
                    {/* <label>New Password: </label><br />
                        <input type="password" id="newPassword" onChange={(e) => setPassword(e.target.value)} /> <br></br>

                        <label>Confirm Password: </label><br />
                        <input type="password" id="confirmPassword" onChange={(e) => setPassword(e.target.value)} /> */}
                    <input
                        type="password"
                        name="password"
                        placeholder='Enter Password'
                        value={userProfile.password}
                        onChange={onInputChange}
                        onBlur={validateInput}></input>
                    {error.password && <span className='err'>{error.password}</span>}
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder='Confirm Password'
                        value={userProfile.confirmPassword}
                        onChange={onInputChange}
                        onBlur={validateInput}></input>
                    {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
                    <input type="submit" value="submit" />
                </div>
                {/* <input type="submit" value="Submit" /> */}
            </form>

        </div>
    )
}
export default EditPassword
