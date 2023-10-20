import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountSettings from './componets/AccountSettings';
import EditEmail from './componets/EditEmail';
import Home from './componets/Home';
import EditPassword from './componets/EditPassword';
import EditZipcode from './componets/EditZipcode';
import EditSchool from './componets/EditSchool';
function App() {

  return ( //Every routes will be wrapped in browser route
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AccountSettings" element={<AccountSettings />} />
        <Route path="/EditEmail" element={<EditEmail />} />
        <Route path="/EditPassword" element={<EditPassword />} />
        <Route path="/EditZipcode" element={<EditZipcode />} />
        <Route path="/EditSchool" element={<EditSchool />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
