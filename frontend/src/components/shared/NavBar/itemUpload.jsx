// ItemUpload.jsx
import React from 'react';
import ImageUploader from '../ImageUploader/ImageUploader';
import './NavBar.css'

const ItemUpload = ({ onTextSubmit }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginLeft: '300px' }}>
      <h1 className="UploadHeader">Upload Items</h1>
      <p className="ItemUploadSubHeader">Please enter in information in all of the following places down below</p>
      <div style={{ marginTop: '20px', marginLeft: '0px' }}>
        <ImageUploader
          onTextSubmit={onTextSubmit}
          showDropzone={true}
          showInputs={true}

        />
      </div>

    </div>
  );
};

export default ItemUpload;
