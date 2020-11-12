import React, { useEffect, useState } from 'react';
import OrderTable from './OrderTable/OrderTable';
import './Orders.css'
const Orders = () => {

    const [allOrder, setAllOrder] = useState([]);
    const [orderList, setOrderList] = useState([]); 
    const [state, setState] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3001/getAllorder')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAllOrder(data);
                setOrderList(data);
            })
    }, [state])

    const filterData = (text) => {
        if (text === 'All') {
            setState(!state);
            setOrderList(allOrder);
        } else {
            const newFilteredArray = allOrder.filter(each => each.status === text);
            setOrderList(newFilteredArray);
        }

    }

    const changeStatus=(id, st)=>{
        console.log(id, st);
        const  orderListObject = [...allOrder];
        const newObj = orderListObject.map(each => {
            if(each._id === id){
                each.status = st;
            }
        })
        // console.log(newObj);
    }
 
    return (
        <div>
            <div>
                <button className="order-btn all" onClick={() => filterData('All')}>All</button>
                <button className="order-btn pending"  onClick={() => filterData('Pending')}>Pending</button>
                <button className="order-btn confirmed" onClick={() => filterData('Confirmed')}>Confirmed</button>
                <button className="order-btn cancelled" onClick={() => filterData('Cancelled')}>Cancelled</button>
            </div>
            <div className="container">
                <div className="row bg-white p-3 mb-1">
                    <div className="col-md-2">
                        <span>SL</span>
                    </div>
                    <div className="col-md-2">
                        <span>Order no</span>
                    </div>
                    <div className="col-md-2">
                        <span>Item Price</span>
                    </div>
                    <div className="col-md-4">
                        <span className="center">Action</span>
                    </div>
                    <div className="col-md-2">
                        <span>Status</span>
                    </div>
                </div>

                {
                    orderList.length > 0
                        ?
                        orderList.map((each, index) => <OrderTable changeStatus={changeStatus}  index={index}  orderData={each} />)
                        :
                        <h5>Loading...</h5>
                }
            </div>
        </div>
    );
};

export default Orders;