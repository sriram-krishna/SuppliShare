import React, { useState } from 'react'
import './AccountSettings.css';

const EditSchool = () => {
    const [setSchool, setSchoolName] = useState("")
    function submit(event) {
        event.preventDefault() //Prevents default behavior of the form when trying to submit
    }
    return (
        <div>
            <body className='Edit-School'>
                <form onSubmit={submit}>
                    <div className="Form-Group">
                        <label>New School Name: </label><br />
                        <input type="text" id="newSchoolName" onChange={(e) => setSchoolName(e.target.value)} />

                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </body>
        </div>
    )
}


export default EditSchool
