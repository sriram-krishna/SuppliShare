// SearchBar.js
import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

import { SearchResult } from "./SearchResult.js";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const searchWrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      searchWrapperRef.current &&
      !searchWrapperRef.current.contains(event.target)
    ) {
      setResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      .then((json) => setResults(json))
      .catch((error) => console.error("Fetch error:", error));
  };

  const handleChange = (e) => setInput(e.target.value);

  return (
    <div ref={searchWrapperRef}>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input placeholder="Search" value={input} onChange={handleChange} />
      </div>
      {results.length > 0 && (
        <div className="results-list">
          {results.map((result, index) => (
            <SearchResult key={index} result={result} />
          ))}
        </div>
      )}
    </div>
  );
};
