import React from 'react';

const WatermarkComponent = () => {
  const backgroundImageStyle = {
    backgroundImage: 'url("/image01.png")', 
    backgroundRepeat: 'repeat',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
	opacity: '0.41',
    backgroundAttachment: 'fixed',
	zIndex: -1,
  };

  return (
    <span style={backgroundImageStyle}>
     
    </span>
  );
};

export default WatermarkComponent;
