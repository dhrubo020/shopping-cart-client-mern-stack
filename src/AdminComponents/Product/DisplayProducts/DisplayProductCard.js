import React from 'react';

const DisplayProductCard = ({ data }) => {
    console.log(data);
    return (
        <div>
            <div className="card">
                <div className="p-2">
                    <img src={data.imageUrl} height='100' alt="" />
                </div>
                <p>{data.name}</p>
                <div>
                    <span>BDT {data.price}</span>
                    <span style={{backgroundColor:'yellow', float:'right'}}>{data.discount}%</span>
                </div>
            </div>
        </div>
    );
};

export default DisplayProductCard;