import React from 'react';
//import LoginComponent from '../../components/Auth/Login';
//import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ItemPosting.css'
import '../Login/Login.css'
function ItemPostingEditor() {
    return (
        <main>
        <div className='centered'>
           <Link to="c">Please post your item</Link>
        </div>
        </main>

    );
}
export default ItemPostingEditor;