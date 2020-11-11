import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../App';
import { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart } from '../../DatabaseManager/DatabaseManager';
import { getCartSummary, processPromoCode, updateCartContext } from '../../DatabaseManager/PriceCalculation';
import CheckOut from '../CheckOut/CheckOut';
import UserNavbar from '../UserNavbar/UserNavbar';
import SingleCartProduct from './SingleCartProduct';

const AllCartProduct = () => {

    const [cartList, setCartList] = useState(getDatabaseCart())
    const [allCartItems, setAllCartItems] = useContext(CartContext);

    const [promoCode, setPromoCode] = useState('');
    const [promoWarning, setPromoWarning] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(null);

    const [priceSummary, setPriceSummary] = useState({
        discount: 0,
        shippingCharge: 0,
        subTotal: 0,
        totalPayable: 0
    })

    const [state, setState] = useState(false)
    // console.log(cartList);

    useEffect(() => { //---------------------------------------------- need to fetch cart data
        const currentCart = getDatabaseCart()
        const allCartKeyArray = Object.keys(currentCart)
        console.log(allCartKeyArray)

        fetch(`http://localhost:3001/findCarts`, { //-------get product info from database
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(allCartKeyArray)
        })
            .then(res => res.json())
            .then(data => {
                const cartSetUp = allCartKeyArray.map(key => {
                    const dataObj = data.find(dataKey => dataKey._id === key)
                    dataObj.quantity = currentCart[key]
                    return dataObj
                })
                setCartList(cartSetUp)
                // calculateTotal(cartSetUp);
                calculateCartSummary(cartSetUp);
            })
    }, [state])


    const changeQuantity = (id, qty) => { //--------- changing quantity
        console.log(id, qty);
        const newObj = [...cartList];
        newObj.map(each => {
            if (each._id === id && qty > 0) {
                each.quantity = qty
                addToDatabaseCart(id, qty);
                return;
            }
        })
        // console.log(newObj, getDatabaseCart())
        setCartList(newObj)
        setAllCartItems(updateCartContext);
        // calculateTotal(newObj);
        calculateCartSummary(newObj);
    }
    const removeItem = (key) => { // -------------- remove item from cart
        removeFromDatabaseCart(key);
        setAllCartItems(updateCartContext);
        setState(!state);
    }

    const calculateCartSummary = (cartList) => {
        console.log(getCartSummary(cartList));
        setPriceSummary(getCartSummary(cartList));
    }
    const handlePromoSubmit = (e) => {

        fetch('http://localhost:3001/getAllPromo')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const theCodeFound = data.find(each => each.promoCodeName === promoCode)
                console.log(theCodeFound);
                if (theCodeFound) {
                    const updatePriceSummary = processPromoCode(priceSummary, theCodeFound)
                    // console.log(updatePriceSummary);
                    setPromoDiscount(updatePriceSummary)
                    setPromoWarning('')
                } else {
                    setPromoWarning('Code Invalid!')
                    setPromoDiscount({});
                }
            })

        e.preventDefault()
    }
    const handleInputPromo = (e) => {
        if (e.target.name === 'promo') {
            let code = e.target.value;
            code = code.toUpperCase();
            console.log(code);
            setPromoCode(code);
        }
    }
    return (
        <div>
            <UserNavbar />

            <div className="container mt-5 ">
                <div className="row">
                    <div className="col-md-9 border-right">
                        <div>
                            {
                                cartList.length > 0
                                &&
                                cartList.map(each =>
                                    <>
                                        <SingleCartProduct
                                            key={each._id}
                                            changeQuantity={changeQuantity}
                                            removeItem={removeItem}
                                            data={each}
                                        />

                                    </>
                                )
                            }

                        </div>
                        <div>
                            {
                                cartList.length > 0
                                &&
                                <CheckOut />
                            }
                        </div>
                    </div>


                    <div className="col-md-3">
                        <div>
                            <div className="border p-2">
                                <span className="center">Order Summary</span>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <span>Subtotal (<span>{allCartItems.length}</span> items)</span>
                                    <span>{priceSummary.subTotal}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Discount  </span>
                                    <span>{priceSummary.discount}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Shipping Charge</span>
                                    <span>{priceSummary.shippingCharge}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Wallet Debit</span>
                                    <span>0</span>
                                </div>
                                <hr />
                                <form onSubmit={handlePromoSubmit}>
                                    <input name="promo" onChange={handleInputPromo} type="text" className="form-control-sm" placeholder="Promo Code" style={{ textTransform: 'uppercase' }} />
                                    <button type="submit">Submit</button>
                                </form>
                                <br />
                                {
                                    promoWarning
                                    &&
                                    <div className="d-flex justify-content-between">
                                        <span>{promoWarning}</span>
                                    </div>
                                }
                                {
                                    promoDiscount.discount > 0
                                    &&
                                    <div className="d-flex justify-content-between">
                                        <span>Total Payable</span>
                                        <span>{promoDiscount.discount}</span>
                                    </div>
                                }
                                {
                                    promoDiscount.expired
                                    &&
                                    <div className="d-flex justify-content-between">
                                        <span>Total Payable</span>
                                        <span>{promoDiscount.expired}</span>
                                    </div>
                                }
                                {
                                    promoDiscount.payable > 0
                                        ?
                                        <div className="d-flex justify-content-between">
                                            <span>Total Payable</span>
                                            <span>{promoDiscount.payable}</span>
                                        </div>
                                        :
                                        <div className="d-flex justify-content-between">
                                            <span>Total Payable</span>
                                            <span>{priceSummary.totalPayable}</span>
                                        </div>
                                }



                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AllCartProduct;