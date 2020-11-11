import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <Link to='/'> Home </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;