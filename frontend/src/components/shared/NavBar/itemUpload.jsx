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
      <div className="TextBox">
        <form>
          <p><label for="ItemInfo">Item Description</label></p>
          <textarea id="ItemInfo" name="ItemInfo" rows="6" cols="160">Please enter any relevant information about your item/items(quantity, condition, description, etc.</textarea>
        </form>
      </div>
    </div>
  );
};


export default ItemUpload;