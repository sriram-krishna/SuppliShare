import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './imageUploader.css';

const ImageUploader = ({ onUpload, showDropzone, showImages }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUpload = useCallback((uploadedFiles) => {
    const newImages = uploadedFiles.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve({
            name: file.name,
            dataURL: reader.result,
          });
        };
      });
    });

    Promise.all(newImages).then((resolvedImages) => {
      setUploadedImages((prevImages) => {
        const updatedImages = [...prevImages, ...resolvedImages];
        localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
        return updatedImages;
      });

      if (onUpload) {
        onUpload(uploadedFiles);
      }
    });
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
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag images into click here to add images or drop them into this box</p>
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
