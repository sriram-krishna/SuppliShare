import React, { useState } from "react";
import "./Header.css";

import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResultsList } from "../SearchResults/SearchResultsList/SearchResultsList";

function Header() {
  const [results, setResults] = useState([]);

  return (
    <header className="header">
      <div className="logo">
        <img src="path-to-your-logo.png" alt="Logo" />
      </div>

      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results} />
      </div>

      <div className="login-button">
        <button>Login</button>
      </div>
    </header>
  );
}

export default Header;
