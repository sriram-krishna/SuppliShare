import React, { useState, useEffect } from 'react';
import ImageUploader from '../shared/ImageUploader/ImageUploader';
import { BlobServiceClient } from '@azure/storage-blob';
import '../shared/ImageUploader/imageUploader.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageCount, setImageCount] = useState(0);
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
        console.log("data from item get", data);
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('Error fetching items. Please try again.');
      }
    };

    fetchItems();
  }, []);

  const handleSubmittedData = (data) => {
    setSubmittedData(data);
    submittedData(setSubmittedData);
    console.log("data submitted handlesubmitted", submittedData);
  };

  // Function to check if a string is a valid JSON
  const isValidJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
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
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginLeft: '300px' }}>
      <h1 style={{ color: '#ff9b82', fontSize: '1.5rem', fontFamily: 'Impact, fantasy' }}>
        Take a look at our items for donation
      </h1>

      {/* Display items fetched from the backend */}
      <div >
        <h2>Take a look at our items</h2>
        <div className="imageGrid" >
          {items.map((item, index) => (
            <div key={index}>
              <h3 className="titleContainer">{item.itemtype}</h3>
              
              {/* Clean the image URLs and map them to img elements */}
              {item.itempictureurl.split(',').map((url, idx) => (
               <div key={idx} className="imageItem" onClick={() => openModal(item)}>
        <Link to={{
  pathname: `/home/${item.itemtype}/${item.zipcode}/${encodeURIComponent(url)}`, // encode the URL parameter
  state: { itemtype: item.itemtype, zipcode: item.zipcode, itempictureurl: url }
}}>
          <img src={cleanImageUrl(url.trim())} alt={item.itemtype} />
        </Link>
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
            <h2 className="PopUpTitle">Title: {selectedItem.itemtype}</h2>
            <p>Description: {selectedItem.description}</p>
			<p>Zipcode: {selectedItem.zipcode}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;