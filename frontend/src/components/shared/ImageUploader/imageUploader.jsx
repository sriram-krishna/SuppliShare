import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './ImageUploader.css';

const ImageUploader = ({ onUpload, showDropzone, showImages, onTextSubmit }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [zip, setZip] = useState('');

  const handleUpload = useCallback(
    async (uploadedFiles) => {
      console.log('handleUpload called');

      try {
        if (title.trim() === '' || description.trim() === '' || zip.trim() === '') {
          alert('Title and description and zip are required.');
          return;
        }

        const formData = new FormData();
        formData.append('title', title);
		console.log("titleform data after apend:", title);
        formData.append('description', description);
		formData.append('zip', zip);
		console.log("descform data after apend:", description);
		console.log("zipform data after apend:", zip);
		console.log("FormData after apending desc and title and zip", formData);

        console.log('Uploaded Files:', uploadedFiles);

      // Extract URLs from the uploadedFiles array and append them to FormData
      const imageUrls = uploadedFiles.map(file => file.url); 

// Iterate over the imageUrls array and append each URL to the FormData object
uploadedFiles.forEach(file => {
  formData.append('image', file); // Append each file with the key 'image'
});
		console.log("FormData after apending img", formData);

        const response = await fetch('http://localhost:5000/uploadimage', {
          method: 'POST',
          body: formData,
          // Omit Content-Type header to let the browser set it automatically
        });

        if (!response.ok) {
          console.error('Failed to upload images. Status:', response.status);
          console.error('Response:', await response.text());
          throw new Error(`Failed to upload images. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response from server sent data:', data);

        if (data && data.uploadedData && data.uploadedData.urls) {
          // Check if the necessary properties are present in the response
          if (onTextSubmit) {
            // Pass title, description, and image URLs to the parent component
            onTextSubmit(title, description, data.uploadedData.urls, zip);
          }

        setUploadedImages((prevImages) => [
          ...prevImages,
          {
            name: 'Image',
            dataURL: data.uploadedData.urls[0],
          },
        ]);
		console.log('Image URL:', data.uploadedData.urls[0]);

        if (onUpload) {
            onUpload(uploadedFiles);
          }

          // Log title, description, and URL
          console.log('Title:', title);
          console.log('Description:', description);
		  console.log('zipcode:', zip);
          console.log('Image URL:', data.uploadedData.urls[0]);
        } else {
          console.error('Invalid response from server:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    [onUpload, title, description,  zip, onTextSubmit]
  );
  useEffect(() => {
    // Revoke object URLs when component unmounts
    return () => {
      uploadedImages.forEach((image) => {
        URL.revokeObjectURL(image.dataURL);
      });
    };
  }, [uploadedImages]);
  useEffect(() => {
  console.log('Title:', title);
  console.log('Description:', description);
  console.log('zip:', zip);
}, [title, description, zip]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleUpload,
    accept: 'image/jpeg',
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB in bytes
  });

  const handleTextClick = (e) => {
    e.stopPropagation(); // Stop the click event from reaching the parent div
  };

  const handleTextSubmit = (e) => {
  e.preventDefault();

  if (title.trim() === '' || description.trim() === '' || zip.trim() === '') {
    alert('Title, description, and Zip are required.');
    return;
  }

  if (typeof onTextSubmit === 'function') {
    // Pass title, description, and zip directly to onTextSubmit
    onTextSubmit(title, description, zip);
  }

  // Reset input fields if needed
  setTitle('');
  setDescription('');
  setZip('');
};

  return (
    <div>
      {showDropzone && (
        <div {...getRootProps()} className="dropzone" id="dropzoneEditor">
          <input {...getInputProps()} />
          <p>Drag images into click here to add images or drop them into this box</p>
          <div className="plus-sign">+</div>
          <form onSubmit={handleTextSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onClick={handleTextClick}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onClick={handleTextClick}
            />
			<input
              type="text"
              placeholder="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              onClick={handleTextClick}
            />
          </form>
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
