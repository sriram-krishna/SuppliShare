import React, { useState } from 'react';
import ImageUploader from '../shared/ImageUploader/imageUploader';

const Home = () => {
  const [headerState, setHeaderState] = useState("loggedin");
  const [navBarState, setnavBarState] = useState("Donor");

  const handleSetHeaderState = (newState) => {
    setHeaderState(newState);
  };
  const handleSetnavBarState = (newState) => {
    setnavBarState(newState);
  };

  const handleUpload = (uploadedFiles) => {
    // Handle the uploaded files if needed
    console.log('Uploaded files:', uploadedFiles);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginLeft: '300px' }}>
      <h1>Welcome to the Home Page</h1>
  
      <button style={{ marginTop: '20px' }} onClick={handleUpload}>
        <ImageUploader onUpload={handleUpload} />
      </button>
    </div>
  );
};

export default Home;
