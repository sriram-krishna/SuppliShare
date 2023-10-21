import React from 'react'
import { useState } from 'react';
import './AccountSettings.css';

const EditEmail = () => {
    const [email, setEmail] = useState("")
    function submit(event) {
        event.preventDefault() //Prevents default behavior of the form when trying to submit
    }
    return (
        <div>
            <body className='Edit-Email'>
                <form onSubmit={submit}>
                    <div className="Form-Group">
                        <label>New Email: </label><br />
                        <input type="text" id="newEmail" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </body>
        </div>
    )
}

export default EditEmail
