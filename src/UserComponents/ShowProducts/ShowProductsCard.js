import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../App';
import { addToDatabaseCart, getDatabaseCart } from '../../DatabaseManager/DatabaseManager';
import { discountPrice, updateCartContext } from '../../DatabaseManager/PriceCalculation';

import 'react-toastify/dist/ReactToastify.css';
import './ShowProducts.css'
import { toast, ToastContainer } from 'react-toastify';


const ShowProductsCard = ({ data }) => {
    const notify = () => toast("Product added to cart");
    const [allCartItems, setAllCartItems] = useContext(CartContext);
    const [cartClick, setCartClick] = useState(false)

    const [displayCartButton, setDisplayCartButton] = useState("notdisplayed") // --- card style flip/hover
    const [toggle, setToggle] = useState("toggle-info") // --- card style flip/hover

    const showButton = e => {
        e.preventDefault();
        setDisplayCartButton("displayed");
        setToggle("toggle-bg");
    };

    const hideButton = e => {
        e.preventDefault();
        setDisplayCartButton("notdisplayed");
        setToggle("toggle-info");
    };

    const handleAddToCart = (id) => {
        console.log(id);
        const currentCart = getDatabaseCart()
        const allCartKeyArray = Object.keys(currentCart)

        if (allCartKeyArray.length > 0) {
            const getExistedId = allCartKeyArray.find(each => each === id)
            if (getExistedId) {
                const newCount = parseInt(currentCart[getExistedId]) + 1;
                addToDatabaseCart(id, newCount);
            } else {
                addToDatabaseCart(id, 1);
            }
        } else {
            addToDatabaseCart(id, 1);
        }
        // console.log(getDatabaseCart())
        setAllCartItems(updateCartContext);
        setCartClick(!cartClick);
        notify();
    }

    const newDiscountPrice = discountPrice(data.name, data.price, data.discount);
    // console.log(newDiscountPrice);

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div>
                <div className="card  productbox"
                    onMouseEnter={e => showButton(e)}
                    onMouseLeave={e => hideButton(e)}
                >
                    <div className={toggle}>
                        <div className="p-2 center">
                            <img src={data.imageUrl} height='200' alt="" />
                        </div>
                        <h3 className="px-3">{data.name}</h3>
                        <div>
                            <span className="px-3">BDT <span style={{ textDecoration: 'line-through' }}>{data.price}</span> {newDiscountPrice}</span>
                            <span className="p-3" style={{ backgroundColor: 'yellow', float: 'right' }}>{data.discount}%</span>
                        </div>
                    </div>

                    <button onClick={() => handleAddToCart(data._id)} className={displayCartButton}>
                        <span className="btn-yellow">Add to Cart</span>
                    </button>
                </div>

            </div>

        </div>
    );
};

export default ShowProductsCard;