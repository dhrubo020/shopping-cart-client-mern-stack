import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../../App';
import { processOrder } from '../../DatabaseManager/DatabaseManager';

const CheckOut = () => {

    const history = useHistory();
    const [allCartItems, setAllCartItems] = useContext(CartContext);
    const [radio, setRadio] = useState(false);
    const [warning, setWarning] = useState('');


    const handleRadio=(rd)=>{
        setRadio(rd)
        if(rd){
            setWarning('');
        }
    }
    console.log(radio);
    const handleCheckOut = () => {
        if (radio) {
            window.alert('Checkout done')
            setAllCartItems([]);
            processOrder(allCartItems);
            history.push('/')
        } else {
            setWarning('You must agree to the Terms and Conditions');
        }
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    {warning && <><small style={{ color: 'red' }}>{warning}</small></>}
                    <div className="d-flex justify-content-between">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" onClick={() => handleRadio(!radio)} />
                            <label class="form-check-label" for="inlineRadio1">
                                I agree to the Terms and Conditions, Privacy & Refund Policy
                            </label>
                        </div>
                        <button onClick={handleCheckOut}>CheckOut</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;