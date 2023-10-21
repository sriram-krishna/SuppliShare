import React, { useState } from 'react'
import './AccountSettings.css';
//import { usePasswordValidation } from "./frontend/Hooks/usePasswordValidation.js";

const EditPassword = () => {
    //const [password, setPassword] = useState("")
    const [password, setPassword] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    function submit(event) {
        event.preventDefault()//Prevents default behavior of the form when trying to submit
    }

    const [error, setError] = useState({
        password: '',
        confirmPassword: ''
    })

    const onInputChange = e => {
        const { name, value } = e.target;
        setPassword(prev => ({
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
                    } else if (password.confirmPassword && value !== password.confirmPassword) {
                        stateObj["confirmPassword"] = "Passwords do not match";
                    } else {
                        stateObj["confirmPassword"] = password.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (password.password && value !== password.password) {
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
        <div>
            <body className='Edit-Passwrd'>
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
                            value={password.password}
                            onChange={onInputChange}
                            onBlur={validateInput}></input>
                        {error.password && <span className='err'>{error.password}</span>}
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder='Confirm Password'
                            value={password.confirmPassword}
                            onChange={onInputChange}
                            onBlur={validateInput}></input>
                        {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
                        <input type="submit" value="submit" />
                    </div>
                    {/* <input type="submit" value="Submit" /> */}
                </form>
                
            </body>
        </div>
    )
}
export default EditPassword
