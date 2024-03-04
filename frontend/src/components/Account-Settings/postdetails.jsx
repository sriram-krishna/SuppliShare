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
      <div className="Box"></div>

      <div className="post-details-content" >
        <p className='Title'>Item Type: {itemtype}</p>
        {itempictureurl && (
          // <div className="imageItem">
          <div className="detailsPic">
            <img src={cleanedItemPictureUrl} alt={itemtype} />
          </div>
        )}
        <table className='TableProp'>
          <tr>
            <th>Item Details</th>
            <th></th>
          </tr>
          <tr>
            <td>Description: </td>
            {/* <td>{description}</td> Placeholder for description */}
            <td>{description}</td>
          </tr>
          <tr>
            <td>Zipcode: </td>
            <td>{zipcode}</td>
          </tr>
        </table>
        {/* <p>Details: {description}</p>
        <p className="zipcode-text">Zipcode: {zipcode}</p> */}
      </div>

    </div>
  );
};

export default PostDetails;
