import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const OrderTable = ({ index, orderData, changeStatus }) => {
    // console.log(orderData);
    const notify = (newStatus) => toast(newStatus);

    const [state, setState] = useState(false);

    const handleAction = (id, newStatus) => {

        const totalPrice = orderData.totalPrice;
        const orderNumber = orderData.orderNumber;
        const status = newStatus;

        const newOrderInfo = { totalPrice, orderNumber, status }
        const sendData = { id, newOrderInfo }

        if (sendData) {
            console.log(sendData);
            setState(!state);
            document.getElementById(`status${orderData._id}`).style.display = 'none';

            fetch('http://localhost:3001/updateOrderStatus', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sendData)
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        // window.alert("Status updated successfully!")
                        notify(newStatus);
                        changeStatus(orderData._id, newStatus);
                        document.getElementById(`newStatus${orderData._id}`).innerText = newStatus;
                    } else {
                        window.alert("Something wrong in updating!")
                    }
                })
        }

    }

    useEffect(() => {
        console.log(state);
    }, [state])

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
            <div className="row bg-white p-3 mb-1">
                <div className="col-md-2">
                    <span>{index + 1}</span>
                </div>
                <div className="col-md-2">
                    <span>{orderData.orderNumber}</span>
                </div>
                <div className="col-md-2">
                    <span>{orderData.totalPrice}</span>
                </div>
                <div className="col-md-4">
                    {
                        orderData.status === 'Pending'
                        &&
                        <div className="center" id={`status${orderData._id}`}>
                            <button className="confirm" onClick={() => handleAction(orderData._id, 'Confirmed')}>Confirm</button>
                            <button className="cancel" onClick={() => handleAction(orderData._id, 'Cancelled')}>Cancel</button>
                        </div>
                    }

                </div>
                <div className="col-md-2">
                    <span id={`newStatus${orderData._id}`}>{orderData.status}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderTable;