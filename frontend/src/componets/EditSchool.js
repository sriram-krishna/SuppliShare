import React, { useState } from 'react'
import './componets.css';

const EditSchool = () => {
    const [setSchool, setSchoolName] = useState("")
    function submit(event) {
        event.preventDefault() //Prevents default behavior of the form when trying to submit
    }
    return (
        <div>
            <form onSubmit={submit}>
                <div className="Form-Group">
                    <label>New SchoolName: </label><br />
                    <input type="text" id="newSchoolName" onChange={(e) => setSchoolName(e.target.value)} />

                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}


export default EditSchool
