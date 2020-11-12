import React, { useEffect, useState } from 'react';
import DisplayProducts from '../../AdminComponents/Product/DisplayProducts/DisplayProducts';
import ShowProducts from '../ShowProducts/ShowProducts';
import UserNavbar from '../UserNavbar/UserNavbar';

const Homepage = () => {

    const [allProduct, setAllProduct] = useState([]);
    const [state, setState] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3001/getAllProduct`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAllProduct(data);
            })
    }, [state])


    const searchProduct=(text)=>{
        console.log(text);
        text = text.toLowerCase();
        const filterProduct = allProduct.filter(each => {
            let name = each.name.toLowerCase();
            return name.match(text);
        })
        setAllProduct(filterProduct);
        if(text === ''){
            setState(!state);
        }
    }

    return (
        <div>
            <UserNavbar searchProduct={searchProduct}/>
            <div className="container">
                <ShowProducts allProduct={allProduct}/>
            </div>
        </div>
    );
};

export default Homepage;