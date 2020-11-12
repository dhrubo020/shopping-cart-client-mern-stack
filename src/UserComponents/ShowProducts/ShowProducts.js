import React, { useEffect, useState } from 'react';
import ShowProductsCard from './ShowProductsCard';
import './ShowProducts.css';




const ShowProducts = ({allProduct}) => {

    // const [allProduct, setAllProduct] = useState([])
    // useEffect(() => {
    //     fetch(`http://localhost:3001/getAllProduct`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setAllProduct(data);
    //         })
    // }, [])

    return (
        <div>
            <div className="card-columns ">
                {
                    allProduct.length > 0
                        ?
                        allProduct.map((each) => <ShowProductsCard key={each._id} data={each} />)
                        :
                        <h5>Loading...</h5>
                }
            </div>
        </div>
    );
};

export default ShowProducts;