import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginView from './views/Login/Login';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/Login" element={<LoginView />} />
        </Routes>
      </Router>
  );
}

export default App;
