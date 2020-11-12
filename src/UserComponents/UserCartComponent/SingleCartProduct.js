import React from 'react';
import { discountPrice, priceMultiplyQuantity } from '../../DatabaseManager/PriceCalculation';

const SingleCartProduct = ({ data, changeQuantity, removeItem }) => {
    // console.log(data);

    const newDiscountPrice = discountPrice(data.name, data.price, data.discount);
    const newTotalPrice = priceMultiplyQuantity(newDiscountPrice, data.quantity);

    return (
        <div>
            <div className="container">
                <div className="row bg-white py-3 mb-1"> 
                    <div className="col-md-2">
                        <img src={data.imageUrl} height="70" alt="" />
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex justify-content-between">
                                    <span>{data.name}</span>
                                    <span onClick={()=>removeItem(data._id)}><i class="fa fa-trash fa-2x" aria-hidden="true"></i></span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row ">
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
                                        Quantity : &nbsp;
                                        <span onClick={()=>changeQuantity(data._id, data.quantity>1 && data.quantity-1)}>
                                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                        </span>
                                        <span style={{fontSize:'18px'}}> {data.quantity} </span>
                                        <span onClick={()=>changeQuantity(data._id, data.quantity+1)}>
                                        <i class="fa fa-minus-circle" aria-hidden="true"></i>
                                        </span>
                                    
                                    </span> <br/>
                                    
                                    <span>Total Price: BDT. {newTotalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
            </div>
            
        </div>
    );
};

export default SingleCartProduct;