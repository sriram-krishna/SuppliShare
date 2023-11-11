import React, { useState } from 'react'
import './AccountSettings.css';

const EditZipcode = () => {
    const [zipcode, setZipcode] = useState("")
    function submit(event) {
        event.preventDefault() //Prevents default behavior of the form when trying to submit
    }
    return (
        <div>
            <body className='Edit-Zipcode'>
                <form onSubmit={submit}>
                    <div className="Form-Group">
                        <label>New Zipcode: </label><br />
                        <input type="number" id="newZipcode" onChange={(e) => setZipcode(e.target.value)} />

                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </body>
        </div>
    )
}

export default EditZipcode
