import React from 'react';

const DisplayProductCard = ({ data }) => {
    // console.log(data);
    return (
        <div>
            <div className="card">
                <div className="p-2 center">
                    <img src={data.imageUrl} height='200' alt="" />
                </div>
                <h3 className="px-3">{data.name}</h3>
                <div>
                    <span className="px-3">BDT {data.price - (data.discount/100)}</span>
                    <span  className="p-3" style={{backgroundColor:'yellow', float:'right'}}>{data.discount}%</span>
                </div>
            </div>
        </div>
    );
};

export default DisplayProductCard;