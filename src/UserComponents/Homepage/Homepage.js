import React from 'react';
import DisplayProducts from '../../AdminComponents/Product/DisplayProducts/DisplayProducts';
import ShowProducts from '../ShowProducts/ShowProducts';
import UserNavbar from '../UserNavbar/UserNavbar';

const Homepage = () => {
    return (
        <div>
            <UserNavbar/>
            <div className="container">
                <ShowProducts/>
            </div>
        </div>
    );
};

export default Homepage;