import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../App';
import { getDatabaseCart } from '../../DatabaseManager/DatabaseManager';
import logo from '../../images/zoynax.png';


const UserNavbar = ({ searchProduct }) => {

    const [allCartItems, setAllCartItems] = useContext(CartContext)

    return (
        <div>
            <div style={{ marginBottom: '100px' }}>
                <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to='/'>
                            <img src={logo} height="50" alt=""/>
                        </Link>
                        <div>
                            <form class="form-inline my-2 my-lg-0">
                                <input class="form-control mr-sm-2" onChange={(e)=>searchProduct(e.target.value)}  type="search" placeholder="Search" />
                              </form>
                        </div>
                        <div className="ml-auto"  >
                            <Link className="mr-5" to='/cart' style={{ textDecoration: 'none', color:'black' }}> 
                            <i class="fa fa-shopping-cart fa-2x"></i>
                            <span style={{ fontSize: '20px', color:'black' }}> &nbsp; {allCartItems.length} </span>
                         </Link>
                            <Link to='/admin' style={{ textDecoration: 'none', fontSize: '20px', color:'black' }}> Admin </Link>
                        </div>
                    </div>

                </nav>
            </div>
        </div>
    );
};

export default UserNavbar;