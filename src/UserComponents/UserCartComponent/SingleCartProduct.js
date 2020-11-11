import React from 'react';
import { discountPrice, priceMultiplyQuantity } from '../../DatabaseManager/PriceCalculation';

const SingleCartProduct = ({ data, changeQuantity, removeItem }) => {
    // console.log(data);

    const newDiscountPrice = discountPrice(data.name, data.price, data.discount);
    const newTotalPrice = priceMultiplyQuantity(newDiscountPrice, data.quantity);

    return (
        <div>
            <div className="container">
                <div className="row"> 
                    <div className="col-md-2">
                        <img src={data.imageUrl} height="70" alt="" />
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex justify-content-between">
                                    <span>{data.name}</span>
                                    <button onClick={()=>removeItem(data._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-4">
                                <div className="d-flex justify-content-between">
                                    <span>Color: Red</span>
                                    <span>Size: XL</span>
                                </div>
                                <span>Product Price: BDT. {newDiscountPrice}</span>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <span>Shipping Method: EMS</span> <br/>
                                    <span>Shipping Charge: BDT. {data.shippingCharge}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    <span>
                                        Quantity:
                                        <button onClick={()=>changeQuantity(data._id, data.quantity>1 && data.quantity-1)}>-</button>
                                        <span>{data.quantity}</span>
                                        <button onClick={()=>changeQuantity(data._id, data.quantity+1)}>+</button>
                                    
                                    </span> <br/>
                                    
                                    <span>Total Price: BDT. {newTotalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    );
};

export default SingleCartProduct;