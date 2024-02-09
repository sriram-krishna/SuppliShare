import React, { useState } from 'react';
import ItemUpload from './ItemUpload';
import Home from '../../Account-Settings/Home';

const mergeData = () => {
  const [submittedData, setSubmittedData] = useState({ title: '', description: '' });

  const handleTextSubmit = (data) => {
    
    console.log('Text submitted to parent', data);
    setSubmittedData(data);
  };

  return (
    <div>
      {/* Pass the state and callback to the components */}
      <ItemUpload onTextSubmit={handleTextSubmit} />
    </div>
  );
};

export default mergeData;
