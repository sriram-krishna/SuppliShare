// components/TextField.jsx
import React from 'react';
import './TextField.css';

function TextField({ placeholder, value, onChange, type = 'text', style = {}, className = '', ...props }) {
    return (
        <input
            className={`textfield ${className}`}  // Updated this line
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={style}  // Updated this line
            {...props}
        />
    );
}


export default TextField;
