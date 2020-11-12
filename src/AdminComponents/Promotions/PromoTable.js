import React from 'react';
import { Link } from 'react-router-dom';
import EditPromo from './EditPromo/EditPromo';

const PromoTable = ({ serial, data }) => {
    console.log(data);
    const { createdAt,
        endDate,
        promoActive,
        promoCodeName,
        promoDiscount,
        startDate,
        usages,
        useTime,
        _id } = data

    const goToEditPromoCode=(id)=>{
        console.log(id);
    }
    return (
        <div>
            <div className="mt-3 bg-white p-3 mb-2">
                <div>
                    <div style={{display:'inline-block'}}>
                        <span>{serial+1}</span>
                        <span className="ml-3"> <b>{promoCodeName}</b>  </span>
                    </div>
                    <div style={{display:'inline-block', float:'right'}}>
                        <Link to={`/admin/editPromoCode/${_id}`}>
                            <button className="btn-yellow mr-4" onClick={()=>goToEditPromoCode(_id)}>Edit</button>
                        </Link>
                        
                        <span>
                            {
                                promoActive === true
                                ?
                                <span style={{backgroundColor:'lightgreen',borderRadius:'10px', padding:'5px'}}>Active</span>
                                :
                                <span style={{backgroundColor:'tomato', borderRadius:'10px', padding:'5px'}}>Deactive</span>
                            }
                        </span>
                    </div>
                </div>
                <hr/>
                <div className="d-flex justify-content-between"  >
                        <span>Created At: {createdAt.slice(0,10)} {createdAt.slice(12,19)}</span>
                        <span>Usages: 4</span>
                        <span>Discount rate: {promoDiscount}%</span>
                        <span>Start Date : {startDate.slice(0,10)}</span>
                        <span>End Date : {endDate.slice(0,10)}</span>
                </div>
            </div>
        </div>
    );
};

export default PromoTable;