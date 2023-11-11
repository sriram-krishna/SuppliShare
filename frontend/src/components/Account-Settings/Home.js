import React, { useState } from 'react';
import ImageUploader from '../shared/ImageUploader/imageUploader';

const Home = () => {
  const [headerState, setHeaderState] = useState("loggedin");

  const handleSetHeaderState = (newState) => {
    setHeaderState(newState);
  };

  const handleUpload = (uploadedFiles) => {
    // Handle the uploaded files if needed
    console.log('Uploaded files:', uploadedFiles);
  };

  return (
    <div>
      
      <h1>Welcome to the Home Page</h1>
     
  
      
      <button onClick={handleUpload}>
        
        {<ImageUploader onUpload={handleUpload} />}
      </button>
    </div>
  );
};

export default Home;
