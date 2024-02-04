import React, { useState, useEffect } from 'react';
import ImageUploader from '../shared/ImageUploader/imageUploader';
import { BlobServiceClient } from '@azure/storage-blob';
import '../shared/ImageUploader/imageUploader.css';


const Home = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageCount, setImageCount] = useState(0);

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
        setImageCount(urls.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Error fetching images. Please try again.');
        setLoading(false);
      }
    };

    fetchImageUrls();
  }, []);

  const openModal = (item) => {
    console.log('Opening modal with item:', item);
    setSelectedItem(item);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setSelectedItem(null);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginLeft: '300px' }}>
      <h1 style={{ color: '#ff9b82', fontSize: '1.5rem', fontFamily: 'Impact, fantasy' }}>
        Take a look at our items for donation
      </h1>
      

      <div className="imageGrid">
        {imageUrls.map((url, index) => (
          <div key={index} className="imageItem" onClick={() => openModal({ title: `Item-${index}`, description: `Description-${index}`, url })}>
            <img src={url} alt={`Item-${index}`} />
          </div>
        ))}
      </div>

      {loading && <p>Loading images...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginTop: '20px' }}>
        <ImageUploader showDropzone={false} showImages={true} />
      </div>

      {selectedItem && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedItem.title}</h2>
            <p>{selectedItem.description}</p>
            <img src={selectedItem.url} alt="Selected Item" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
