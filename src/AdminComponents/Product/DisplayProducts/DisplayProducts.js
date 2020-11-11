import React, { useEffect, useState } from 'react';
import AddProductForm from '../AddProductForm/AddProductForm';
import DisplayProductCard from './DisplayProductCard';

const DisplayProducts = () => {

    const [addProductButtonState, setAddProductButtonState] = useState(false)

    const [allProduct, setAllProduct] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/getAllProduct`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAllProduct(data);
            })
    }, [addProductButtonState])

    return (
        <div>
            {
                addProductButtonState
                    ?
                    <AddProductForm />
                    :
                    <>
                        <button onClick={()=>setAddProductButtonState(!addProductButtonState)}>Add New Product</button>
                        
                        <div className="card-columns">
                            {
                                allProduct.length>0
                                ?
                                allProduct.map((each) => <DisplayProductCard key={each._id} data={each} />)
                                :
                                <h5>Loading...</h5>
                            }
                        </div>
                    </>
            }

        </div>
    );
};

export default DisplayProducts;