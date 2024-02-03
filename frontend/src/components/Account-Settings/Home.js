import React, { useState, useEffect } from 'react';
import ImageUploader from '../shared/ImageUploader/imageUploader';
import { BlobServiceClient } from '@azure/storage-blob';
import '../shared/ImageUploader/imageUploader.css';

const Home = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const containerUrl = 'https://supplishareblobstorage.blob.core.windows.net';
        const sasToken = 'sp=rwl&st=2024-02-03T14:50:18Z&se=2024-02-04T22:50:18Z&skoid=9c781b40-6f43-4d2b-b39c-59aeaa77066c&sktid=f3d96fbf-2b4f-454d-ae08-e2ffd89b051f&skt=2024-02-03T14:50:18Z&ske=2024-02-04T22:50:18Z&sks=b&skv=2022-11-02&sv=2022-11-02&sr=c&sig=suTOcAysssrri%2B9jwdThOvSPykj4ar4ULc4mgAXK%2FuQ%3D';

        console.log('Fetching images from:', containerUrl);

        const blobServiceClient = new BlobServiceClient(containerUrl + '?' + sasToken);
        const containerClient = blobServiceClient.getContainerClient('sstest');

        const urls = [];
        for await (const blobItem of containerClient.listBlobsFlat()) {
          // Use the correct blob URL format with the SAS token
          const blobUrl = `${containerUrl}/sstest/${blobItem.name}?${sasToken}`;
          urls.push(blobUrl);
        }

        setImageUrls(urls);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Error fetching images. Please try again.');
        setLoading(false);
      }
    };

    fetchImageUrls();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginLeft: '300px' }}>
      <h1 style={{ color: '#ff9b82', fontSize: '1.5rem', fontFamily: 'Impact, fantasy' }}>
        Take a look at our items for donation
      </h1>

      <div className="imageGrid"> {/* Apply grid layout */}
        {imageUrls.map((url, index) => (
          <div key={index} className="imageItem"> {/* Apply item styles */}
            <img src={url} alt={`Item-${index}`} />
          </div>
        ))}
      </div>

      {/* Display loading indicator or error message */}
      {loading && <p>Loading images...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginTop: '20px' }}>
        <ImageUploader showDropzone={false} showImages={true} />
      </div>
    </div>
  );
};

export default Home;
