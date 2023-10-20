import React, { useState } from 'react'

const EditPassword = () => {
    const [password, setPassword] = useState("")
    function submit(event) {
         event.preventDefault()//Prevents default behavior of the form when trying to submit
    }
    return (
        <div>
            <form onSubmit={submit}>
                <div className="Form-Group">
                    <label>New Password: </label><br />
                    <input type="password" id="newPassword" onChange={(e) => setPassword(e.target.value)} />

                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default EditPassword
