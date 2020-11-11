import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../App';
import { getDatabaseCart } from '../../DatabaseManager/DatabaseManager';

const UserNavbar = () => {
    
    const [allCartItems, setAllCartItems] = useContext(CartContext)

    return (
        <div>
            <div style={{marginBottom:'100px'}}>
            <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to='/'>Navbar</Link>
                    <Link to='/cart'> Cart <span> {allCartItems.length} </span> </Link>
                </div>
            </nav>
        </div>
        </div>
    );
};

export default UserNavbar;