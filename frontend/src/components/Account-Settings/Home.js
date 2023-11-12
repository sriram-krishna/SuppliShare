// Home.jsx
import React from 'react';
import ImageUploader from '../shared/ImageUploader/imageUploader';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginLeft: '300px' }}>
      <h1>Take a look at our items for donation</h1>
  
      <div style={{ marginTop: '20px' }}>
<ImageUploader showDropzone={false} showImages={true} />
      </div>
    </div>
  );
};

export default Home;
