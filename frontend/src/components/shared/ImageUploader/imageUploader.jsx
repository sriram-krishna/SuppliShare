import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ onUpload }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    //  new files with existing images
    setUploadedImages((prevImages) => [...prevImages, ...acceptedFiles]);

    // Callback to handle the uploaded files
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div>
      <div {...getRootProps()} className="dropzone"> 
        <input {...getInputProps()} />
        <p>Drag images into click here to add images or drop them into this box</p>
      </div>

      {uploadedImages.length > 0 && (
        <div className="uploaded-images">
          <h2>Uploaded Images:</h2>
          <div className="image-grid">
            {uploadedImages.map((image, index) => (
              <img key={index} src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
