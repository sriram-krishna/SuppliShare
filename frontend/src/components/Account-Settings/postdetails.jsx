import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const PostDetails = () => {
  // Extract parameters from the URL
  const { itemtype, zipcode, itempictureurl } = useParams();
  console.log('Individual parameters:', itemtype, zipcode, itempictureurl);

  // Get the location object to access the entire state
  const location = useLocation();
  console.log('Location state:', location.state);

  
     return (
    <div className="post-details-container">
      <div className="post-details-content">
        <p>Item Type: {itemtype}</p>
        <p>Zipcode: {zipcode}</p>
        {itempictureurl && (
          <div className="imageItem">
            <img src={itempictureurl} alt={itemtype} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
