import './App.css';
import React from 'react';
import {useState} from 'react';
function App() {
  const [email,setEmail] = useState("")

  function handleEmailChange(event){
  setEmail(event.target.value)
  }
 
  function submit(event){ 
    event.preventDefault()
    fetch("http://localhost:5000",{
      method:"POST", mode:"cors", body:JSON.stringify({email:email}),headers:{
        Accept:"application/json","Content-Type": "application/json"
      }
    })
    .then(response=>response.json())
    .then(responseJSON=>console.log(responseJSON.message))
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1><b>Edit Email</b></h1>
      <form>
        {/* <label>Current Email:</label><br /> */}
        <label>New Email: </label><br />
        <input type="text" id="newEmail" value={email} onChange={handleEmailChange} /><br /><br />
        <input type="submit" value="Submit" onClick={submit} />
    </form>
      </header>
     
    </div>
  );
}

export default App;
