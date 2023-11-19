import React, { useState, useEffect} from "react";

import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) {
        fetchData(input);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  const fetchData = (value) => {
    fetch(process.env.REACT_APP_SEARCH_API_URL)
      .then((response) => response.json())
      .then((json) => {
        setResults(json);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Search"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
