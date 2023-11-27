// Home.jsx
import React from 'react';
import ImageUploader from '../shared/ImageUploader/imageUploader';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginLeft: '300px' }}>
      <h1 style={{ color: '#ff9b82', fontSize: '1.5rem', fontFamily: 'Impact, fantasy' }}> Take a look at our items for donation</h1>
  
      <div style={{ marginTop: '20px' }}>
<ImageUploader showDropzone={false} showImages={true} />
      </div>
    </div>
  );
};

export default Home;
