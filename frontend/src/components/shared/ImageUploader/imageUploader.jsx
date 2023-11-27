import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './imageUploader.css';

const ImageUploader = ({ onUpload, showDropzone, showImages }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUpload = useCallback(async (uploadedFiles) => {
  const formData = new FormData();

  // Append each uploaded file to the FormData
  uploadedFiles.forEach((file) => {
    formData.append('images', file);
  });

  try {
    // Upload images to the backend
    const response = await fetch('http://backendserver:3000/uploadimage', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload images. Status: ${response.status}`);
    }

    // Parse the response to get blob storage links
    const data = await response.json();

    // Update state with blob storage links
    setUploadedImages((prevImages) => {
      const updatedImages = [
        ...prevImages,
        ...data.map((blobStorageLink) => ({
          name: 'Image', // You can customize the name as needed
          dataURL: blobStorageLink,
        })),
      ];

      localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
      return updatedImages;
    });

    // Call the onUpload callback if provided
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

  useEffect(() => {
    // Load images from local storage when the component mounts
    const storedImages = localStorage.getItem('uploadedImages');
    if (storedImages) {
      const parsedImages = JSON.parse(storedImages);
      setUploadedImages(parsedImages);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleUpload,
    accept: 'image/*',
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
