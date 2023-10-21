import React, { useState } from 'react'
import './componets.css';

const EditZipcode = () => {
    const [zipcode, setZipcode] = useState("")
    function submit(event) {
        event.preventDefault() //Prevents default behavior of the form when trying to submit
    }
    return (
        <div>
            <form onSubmit={submit}>
                <div className="Form-Group">
                    <label>New Zipcode: </label><br />
                    <input type="number" id="newZipcode" onChange={(e) => setZipcode(e.target.value)} />

                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default EditZipcode
