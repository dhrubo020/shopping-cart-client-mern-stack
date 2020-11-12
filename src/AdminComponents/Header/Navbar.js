import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/zoynax.png'

const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container-fluid">
                    <a class="navbar-brand" href='/'>
                        <img src={logo} height="50" alt=""/>
                    </a>
                    <Link to='/'> Home </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;