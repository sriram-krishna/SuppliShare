import React from 'react';
import ImageUploader from '../ImageUploader/imageUploader';

const ItemUpload = () => {
  const handleUpload = (uploadedFiles) => {
    // Handle the uploaded files if needed
    console.log('Uploaded:', uploadedFiles);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginLeft: '300px' }}>
      <h1>Upload Items hello</h1>

      <div style={{ marginTop: '20px' }}> /*This div handles the image dropzone*/
        {/* Use ImageUploader with showDropzone={false} to hide the drop zone */}
        <ImageUploader onUpload={handleUpload} showDropzone={true} />
      </div>
      <p>hello</p>
      <div>
        <input type="button" value="Click me to save draft!">
        </input>
    </div>
    </div>
  );
};
export default ItemUpload;