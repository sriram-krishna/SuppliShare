// ItemUpload.jsx
import React, { useCallback, useState } from 'react';
import ImageUploader from '../ImageUploader/imageUploader';
import Home from '../../Account-Settings/Home';
import PropTypes from 'prop-types';

const ItemUpload = ({ onTextSubmit }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginLeft: '300px' }}>
      <h1>Upload Items</h1>
      <div style={{ marginTop: '20px', marginLeft: '0px' }}>
        <ImageUploader
          onTextSubmit={onTextSubmit}
          showDropzone={true}
          showInputs={true}
		  
        />
      </div>
      <p>image</p>
      
    </div>
  );
};

export default ItemUpload;
