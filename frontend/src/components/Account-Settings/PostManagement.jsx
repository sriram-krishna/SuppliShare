import React, { useState, useEffect } from 'react';
import ImageUploader from '../shared/ImageUploader/imageUploader';
import { BlobServiceClient } from '@azure/storage-blob';
import '../shared/ImageUploader/imageUploader.css';

const PostManagementView = () => {
 const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const containerUrl = 'https://supplishareblobstorage.blob.core.windows.net';
    const sasToken = 'sp=rwdl&st=2024-02-03T21:31:04Z&se=2024-02-05T05:31:04Z&skoid=9c781b40-6f43-4d2b-b39c-59aeaa77066c&sktid=f3d96fbf-2b4f-454d-ae08-e2ffd89b051f&skt=2024-02-03T21:31:04Z&ske=2024-02-05T05:31:04Z&sks=b&skv=2022-11-02&sv=2022-11-02&sr=c&sig=AUd3OcsczwyjDQlHQISHhU5U255oDXEvYo0UjF57Nu8%3D';

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
  
  const deleteImage = async () => {
  try {
    const containerUrl = 'https://supplishareblobstorage.blob.core.windows.net';
    const sasToken = 'sp=rwdl&st=2024-02-03T21:57:07Z&se=2024-02-05T05:57:07Z&skoid=9c781b40-6f43-4d2b-b39c-59aeaa77066c&sktid=f3d96fbf-2b4f-454d-ae08-e2ffd89b051f&skt=2024-02-03T21:57:07Z&ske=2024-02-05T05:57:07Z&sks=b&skv=2022-11-02&sv=2022-11-02&sr=c&sig=rJ4%2F0B0zFRHuGwivbO7jVwATwJBx5izVqmnHPN5vF0g%3D';

     console.log('Fetching images from:', containerUrl);

    const blobServiceClient = new BlobServiceClient(containerUrl + '?' + sasToken);
    const containerClient = blobServiceClient.getContainerClient('sstest');

    const urls = [];
    for await (const blobItem of containerClient.listBlobsFlat()) {
      
      const blobUrl = `${containerUrl}/sstest/${blobItem.name}?${sasToken}`;
      urls.push(blobUrl);
    }

    const blobUrl = selectedItem.url;
    const urlObject = new URL(blobUrl);
    let blobName = urlObject.pathname;

    // Ensure blobName starts with the container name
    if (!blobName.startsWith('/sstest/')) {
      throw new Error('Invalid blob URL format.');
    }

    
    blobName = blobName.substring('/sstest/'.length);

    console.log('Deleting blob with URL:', blobUrl);

    // Create blob client from container client
    const blobClient = containerClient.getBlockBlobClient(blobName);

    // Delete the blob
    await blobClient.delete({ deleteSnapshots: 'include' });

    console.log('Blob deleted successfully');

    // Refetch the images after deletion
    const updatedUrls = [];
    for await (const blobItem of containerClient.listBlobsFlat()) {
      const updatedUrl = `${containerUrl}/sstest/${blobItem.name}?${sasToken}`;
      updatedUrls.push(updatedUrl);
    }

    // Update the state to reflect the changes
    setImageUrls(updatedUrls);
    setImageCount(updatedUrls.length);
    closeModal(); // Close the modal after deletion
  } catch (error) {
    console.error('Error deleting image:', error);
    setError('Error deleting image. Please try again.');
  }
};

		

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginLeft: '300px' }}>
      <h1 style={{ color: '#ff9b82', fontSize: '1.5rem', fontFamily: 'Impact, fantasy' }}>
        click a picture to edit it
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

          {/* Delete Button */}
          <button onClick={() => deleteImage(selectedItem)}>Delete</button>
        </div>
      </div>
    )}
  </div>
);
};


export default PostManagementView;