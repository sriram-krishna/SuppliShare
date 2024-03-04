import React, { useEffect, useState } from 'react';
import axios from 'axios';

function handleApi() {
  const [data, setData] = useState([]);
//handle api and  set data setData
  useEffect(() => {
  //fetch the data
    const fetchData = async () => {
      try {
        const result = await axios.get('enterAPI  KEY HERE', {
		//set the content type to accept json
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data from Node.js server:', error);
      }
    };
    fetchData();
  }, []);
//returning daata retrieved from API CALL
  return (
    <div>
      <h1>Data from Azure API:</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default handleApi;