import React, { useEffect, useState } from 'react';
import PromoTable from './PromoTable';

const Promotions = () => {

    const [promoList, setPromoList] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3001/getAllPromo')
        .then(res => res.json())
        .then(data => {
            setPromoList(data)
        })
    },[])

    return (
        <div>
            <div>
                {
                    promoList.length > 0
                    ?
                    promoList.map((each,index) => <PromoTable key={each._id} serial={index} data={each}/>)
                    :
                    <h5>Searching..</h5>
                }
            </div>
        </div>
    );
};

export default Promotions;