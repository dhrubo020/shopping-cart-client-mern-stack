import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {


    return (
        <div>
            <div className="" id="navbarSupportedContent">

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div class="btn-group dropright">
                            <button type="button" className="promotion-dropdown dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Promotion
                            </button>
                            <div class="dropdown-menu">
                                <Link className="nav-link" to="/admin/promotion">
                                    Promo Codes
                                </Link>
                                <Link className="nav-link" to="/admin/promotion/addPromo">
                                    Add Promo Codes
                                </Link>
                            </div>
                        </div>

                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/orders">
                            Orders
                        </Link>
                    </li>
                    <li className="nav-item">
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