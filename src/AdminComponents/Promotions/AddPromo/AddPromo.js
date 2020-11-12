import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const AddPromo = () => {

    const notify = () => toast("New Promo Code Added Successfully");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [promoActive, setPromoActive] = useState(false)
    const { register, handleSubmit, reset, watch, errors } = useForm();


    // const checkValidationDate=()=>{
    //         // check the dates
    //         if ((new Date() > new Date(startDate)) && (new Date() < new Date(endDate))) {
    //           return true
    //         } else {
    //           return false
    //         }
    // }
    // console.log(checkValidationDate());

    const onSubmit = data => {
        let codeName = data.promoCodeName
        data.promoCodeName = codeName.toUpperCase();
        const codeInfo = { ...data, promoActive: promoActive, startDate, endDate, createdAt: new Date(), usages: 0 }

        if (codeInfo) {
            console.log(codeInfo)
            // if(!checkValidationDate()){
            //     window.alert("Invalid Date Combination!")
            //     return 0;
            // }
            fetch('http://localhost:3001/addPromoCode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(codeInfo)
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        // window.alert("Code added successfully!")
                        notify();
                    } else {
                        window.alert("This Code already added!")
                    }
                })
        }
    };


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
            <div className="my-5 scroll-able form-bg p-3" style={{ marginLeft: '35%', maxWidth: '300px' }}>
                <h3 className="text-center">Add New Promo Code</h3>
                < form onSubmit={handleSubmit(onSubmit)} >
                    <div >
                        <label>Promo code</label><br />
                        < input name="promoCodeName" style={{ textTransform: "uppercase" }} type="text" className="form-control-sm" ref={register({ required: true })} required />
                        {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                    </div>
                    <div>
                        <label>Start Date</label><br />
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            className="red-border"
                        />
                        {/* < input name="startDate" type="date" className="form-control-lg" defaultValue={dateNow} ref={register({ required: false })} /> */}
                        {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                    </div>
                    <div>
                        <label>End Date</label><br />
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            className="red-border"
                        />
                        {/* < input name="endDate" type="date" className="form-control-lg " defaultValue={dateNow} ref={register({ required: false })} /> */}
                        {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                    </div>
                    <div>
                        <label>Discount Rate in %</label><br />
                        < input name="promoDiscount" type="number" className="form-control-sm" defaultValue="0" ref={register({ required: false })} required />
                        {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                    </div>
                    <div>
                        <label>Use Time</label><br />
                        < input name="useTime" type="number" className="form-control-sm" defaultValue="0" ref={register({ required: false })} required />
                        {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                    </div>
                    <div >
                        <br />
                        <label>Active</label>
                        <div style={{ display: 'inline-block', float: 'right' }} className="custom-control custom-switch" >
                            <input type="checkbox" onClick={() => setPromoActive(!promoActive)} className="custom-control-input form-control-lg" id="customSwitch1" />
                            <label className="custom-control-label" for="customSwitch1"></label>
                        </div>
                    </div>

                    <br />
                    <button type="submit" className="btn-yellow">Add Promo Code</button>
                </form >
            </div>
        </div>
    );
};

export default AddPromo;