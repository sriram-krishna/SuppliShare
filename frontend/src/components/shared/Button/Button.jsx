// components/Button.jsx
import React from 'react';
import './Button.css';

function Button({ label, onClick, size = 'medium', type = 'primary', style = {}, className = '', ...props }) {
    return (
        <button
            className={`btn ${size} ${type} ${className}`}  // Updated this line
            onClick={onClick}
            style={style}  // Updated this line
            {...props}
        >
            {label}
        </button>
    );
}


export default Button;
