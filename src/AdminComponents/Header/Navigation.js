import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {


    return (
        <div>
            <div className="bg-white" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div class="btn-group dropright">
                            
                            <button type="button" className="btn-white promotion-dropdown dropdown-toggle" data-toggle="dropdown" >
                                <Link>Promotion</Link> 
                            </button>
                            <div class="dropdown-menu">
                                <Link className="nav-link pl-3" to="/admin/promotion">
                                    Promo Codes
                                </Link>
                                <Link className="nav-link pl-3" to="/admin/promotion/addPromo">
                                    Add Promo Codes
                                </Link>
                            </div>
                        </div>

                    </li>
                    <li className="nav-item pl-3">
                        <Link className="nav-link" to="/admin/orders">
                            Orders
                        </Link>
                    </li>
                    <li className="nav-item pl-3">
                        <Link className="nav-link" to="/admin">
                            Products
                        </Link>

                    </li>
                </ul>

            </div>

        </div>
    );
};

export default Navigation;