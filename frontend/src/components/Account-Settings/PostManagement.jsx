import React, { useState, useEffect } from 'react';
import ImageUploader from '../shared/ImageUploader/ImageUploader';

import '../shared/ImageUploader/ImageUploader.css';

const PostManagementView = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [submittedData, setSubmittedData] = useState({ title: '', description: '' });
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
        
      }
    };

    fetchItems();
  }, []);

  const handleSubmittedData = (data) => {
    setSubmittedData(data);
    submittedData(setSubmittedData);
  };

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const cleanImageUrl = (url) => {
    return url.replace(/"/g, ''); // Remove %22 (")
  };

 const fetchItems = async () => {
    try {
        const response = await fetch('http://localhost:5000/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
        
      }
    };

const deleteItem = async (itemType) => {
  try {
    // Fetch the item ID based on the item type
    const response = await fetch(`http://localhost:5000/getItemId/${itemType}`);
    if (!response.ok) {
      throw new Error('Failed to fetch item ID');
    }
    const { itemId } = await response.json();

    // Make the delete request using the retrieved item ID
    const deleteResponse = await fetch(`http://localhost:5000/deletePostById/${itemId}`, {
      method: 'DELETE',
    });
    if (!deleteResponse.ok) {
      throw new Error('Failed to delete item');
    }

    // Refetch the items to update the list
    await fetchItems();
  } catch (error) {
    console.error('Error deleting item:', error);
    // Handle error
  }
};

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginLeft: '300px' }}>
      <h1 style={{ color: '#ff9b82', fontSize: '1.5rem', fontFamily: 'Impact, fantasy' }}>
        Click an image for Delete Details
      </h1>

      {/* Display items fetched from the backend */}
      <div >
        <h2>Content Moderation</h2>
        <div className="imageGrid" >
          {items.map((item, index) => (
            <div key={index} className="imageGriddy">
             <div className="titleContainer">
          <h3>Title: {item.itemtype}</h3>
        </div>
              
              {/* Clean the image URLs and map them to img elements */}
              {item.itempictureurl.split(',').map((url, idx) => (
                <div key={idx} className="imageItem" onClick={() => openModal(item)}>
                  <img
                    src={cleanImageUrl(url.trim())}
                    alt={item.itemtype}
                  />
                 
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <ImageUploader showDropzone={false} showImages={false} onTextSubmit={handleSubmittedData} />
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Title: {selectedItem.itemtype}</h2>
            <p>Description: {selectedItem.description}</p>
            <p>Zipcode: {selectedItem.zipcode}</p>
			<button onClick={() => deleteItem(selectedItem.itemtype)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostManagementView;
