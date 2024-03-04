import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const PostDetails = () => {
  // Extract parameters from the URL
  const { itemtype, zipcode, description, itempictureurl } = useParams();
  console.log('Individual parameters:', itemtype, zipcode, description, itempictureurl);

  // Get the location object to access the entire state
  const location = useLocation();
  console.log('Location state:', location.state);
  const cleanImageUrl = (url) => {
    return url.replace(/"/g, ''); // Remove %22 (")
  };

  // Clean the image URL
  const cleanedItemPictureUrl = cleanImageUrl(itempictureurl);
  
     return (
    <div className="post-details-container">
      <div className="post-details-content">
        <p>Item Type: {itemtype}</p>
        <p>Zipcode: {zipcode}</p>
		<p>Description: {description} </p>
        {itempictureurl && (
          <div className="imageItem">
            <img src={cleanedItemPictureUrl} alt={itemtype} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
