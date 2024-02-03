import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './imageUploader.css';

const ImageUploader = ({ onUpload, showDropzone, showImages }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUpload = useCallback(async (uploadedFiles) => {
    const formData = new FormData();

    uploadedFiles.forEach((file) => {
      formData.append('image', file);
      // Check file size against maxSize
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds the limit:');
        return; // Do not proceed with uploading this file
      }
    });

    console.log('FormData:', formData);

    try {
      const response = await fetch('http://localhost:5000/uploadimage', {
        // THIS NEEDS TO BE UPDATED to API
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Failed to upload images. Status:', response.status);
        console.error('Response:', await response.text());
        throw new Error(`Failed to upload images. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from server:', data);

      setUploadedImages((prevImages) => [
        ...prevImages,
        {
          name: 'Image',
          dataURL: data.urls[0], // Assuming there's only one URL
        },
      ]);

      if (onUpload) {
        onUpload(uploadedFiles);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [onUpload]);

  useEffect(() => {
    // Revoke object URLs when component unmounts
    return () => {
      uploadedImages.forEach((image) => {
        URL.revokeObjectURL(image.dataURL);
      });
    };
  }, [uploadedImages]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleUpload,
    accept: 'image/jpeg',
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB in bytes
  });

  return (
    <div>
      {showDropzone && (
        <div {...getRootProps()} className="dropzone" id="dropzoneEditor">
          <input {...getInputProps()} />
          <p>Drag images into click here to add images or drop them into this box</p>
          <div className="plus-sign">+</div>
        </div>
      )}

      {showImages && uploadedImages.length > 0 && (
        <div className="imageGrid">
          {uploadedImages.map((image, index) => (
            <div key={index} className="imageItem">
              <img
                src={image.dataURL}
                alt={image.name}
                style={{ width: '250px', height: '250px', objectFit: 'fill' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
