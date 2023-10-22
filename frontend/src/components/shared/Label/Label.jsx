// components/Label.jsx
import React from 'react';
import './Label.css';

function Label({ text, type = 'body', ...props }) {
    return (
        <div className={`label ${type}`} {...props}>
            {text}
        </div>
    );
}

export default Label;
