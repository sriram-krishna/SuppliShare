// ItemUpload.jsx
import React from 'react';
import ImageUploader from '../ImageUploader/imageUploader';
import "./ItemUpload.css"
const ItemUpload = () => {
  const handleUpload = (uploadedFiles) => {
    // Handle the uploaded files if needed
    console.log('Uploaded files:', uploadedFiles);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginLeft: '300px' }}>
      <h1>Upload Items</h1>

      <div style={{ marginTop: '20px' }}>
        {/* Use ImageUploader with showDropzone={false} to hide the drop zone */}
        <ImageUploader onUpload={handleUpload} showDropzone={true} />
      </div>
      <div className="post-buttons">
        <form>
          <button className="SaveDraft">Save Draft</button>
          <button className="PostDraft">Post Item</button>
        </form>
      </div>
	  <p>image</p>
    </div>
  );
};


export default ItemUpload;