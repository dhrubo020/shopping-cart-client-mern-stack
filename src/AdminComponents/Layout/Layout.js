import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Header/Navbar';
import Orders from '../Orders/Orders';
import AddProductForm from '../Product/AddProductForm/AddProductForm';
import Promotions from '../Promotions/Promotions';
import Navigation from '../Header/Navigation';
import AddPromo from '../Promotions/AddPromo/AddPromo';
import EditPromo from '../Promotions/EditPromo/EditPromo';
import DisplayProducts from '../Product/DisplayProducts/DisplayProducts';

const Layout = () => {

    let currentLocation = useLocation()
    console.log(currentLocation.pathname)

    return (
        <div>
            <Navbar />

            <div className="container-fluid">
                <div className="row mx-2">

                    <div className="col-md-2 bg-light">
                        <Navigation />
                    </div>

                    <div className="col-md-10">


                        {
                            currentLocation.pathname === '/admin/promotion'
                            &&
                            <Promotions />
                        }
                        {
                            currentLocation.pathname === '/admin/promotion/addPromo'
                            &&
                            <AddPromo />
                        }
                        {
                            currentLocation.pathname === '/admin/orders'
                            &&
                            <Orders />
                        }
                        {
                            currentLocation.pathname === '/admin'
                            &&
                            <DisplayProducts/>
                        }
                        {
                            currentLocation.pathname.slice(0,16) === '/admin/editPromo'
                            &&
                            <EditPromo />
                        }
                    </div>
                </div>
            </div>



        </div>
    );
};

export default Layout;