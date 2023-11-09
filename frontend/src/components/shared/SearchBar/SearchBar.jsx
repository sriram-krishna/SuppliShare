import React, { useState } from 'react';
// import TextField from '../TextField/TextField'; // Commenting out the TextField import
//import Button from '../Button/Button';
import { AiOutlineSearch } from 'react-icons/ai';
import './SearchBar.css';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="searchbar-container">
            <div className="search-icon">
                <AiOutlineSearch className="AiOutlineSearch" />
				
            </div>
			
				<input
				type="text"
				placeholder="Search..."
				value={query}
				onChange={e => setQuery(e.target.value)}
				className="searchSetting"
				style={{ color: '#999' }} // Inline style for placeholder text color
				/>
				
            {/* <TextField
                placeholder="Search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            /> */}
           {/* <Button onClick={handleSearch}>Search</Button>*/}
        </div>
		
    );
}

export default SearchBar;