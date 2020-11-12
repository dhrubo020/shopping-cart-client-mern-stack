import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CartContext, UserContext } from '../../App';
import { processOrder } from '../../DatabaseManager/DatabaseManager';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const CheckOut = ({ checkoutData }) => {

    const notify = () => toast("Checkout Successful");

    // console.log(checkoutData);
    const history = useHistory();
    const [allCartItems, setAllCartItems] = useContext(CartContext);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [radio, setRadio] = useState(false);
    const [warning, setWarning] = useState('');


    const handleRadio = (rd) => {
        setRadio(rd)
        if (rd) {
            setWarning('');
        }
    }
    console.log(radio);
    const handleCheckOut = () => {
        if (radio) {
            if (loggedInUser.phone) {

                fetch('http://localhost:3001/placeOrder', { //----------- user to db
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(checkoutData)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            // window.alert('Checkout Done')
                            // console.log(loggedInUser.phone);
                            notify();
                            setAllCartItems([]);
                            processOrder(allCartItems);
                            setTimeout(()=>{
                                history.push('/')
                            },3000)
                        } else {
                            window.alert("Checkout error!")
                        }
                    })


                // window.alert(data.totalPrice)
                // // console.log(loggedInUser.phone);
                // setAllCartItems([]);
                // processOrder(allCartItems);
                // history.push('/')
            } else {
                history.push('/login')
            }

        } else {
            setWarning('You must agree to the Terms and Conditions');
        }
    }
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
            <div className="row mb-5 bg-white py-2">
                <div className="col-md-12">
                    {warning && <><small style={{ color: 'red' }}>{warning}</small></>}
                    <div className="">
                        <div className="form-check form-check-inline d-inline">
                            <input className="form-check-input" type="checkbox" onClick={() => handleRadio(!radio)} />
                            <label className="form-check-label" for="inlineRadio1">
                                I agree to the Terms and Conditions, Privacy & Refund Policy
                            </label>
                        </div>
                        <button className="btn-yellow ml-5" onClick={handleCheckOut}>CheckOut</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;