import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const EditPromo = () => {
    let currentLocation = useLocation()
    const loc = currentLocation.pathname
    const id = loc.slice(21, loc.length)

    const [formValues, setFormValues] = useState({})

    useEffect(  () => {
         fetch(`http://localhost:3001/getPromoById/${id}`)
            .then(res => res.json())
            .then(data => {
                setFormValues(data)
                console.log(data);
            })
    }, [])


    const [endDate, setEndDate] = useState(new Date());
    const [promoActive, setPromoActive] = useState(false)
    const { register, handleSubmit, reset, watch, errors } = useForm();


    const onSubmit = data => {

        const promoCodeName = formValues.promoCodeName;
        const startDate = formValues.startDate;
        const id = formValues._id;
        const codeInfo = { ...data, promoActive, endDate, updatedAt: new Date(), promoCodeName, startDate}
        const sendData = {id, codeInfo}

        if (sendData) {
            console.log(sendData)

            fetch('http://localhost:3001/updatePromoCode', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sendData)
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        window.alert("Code updated successfully!")
                    } else {
                        window.alert("Something wrong in updating!")
                    }
                })
        }
    };

    return (
        <div>
            <div className="center my-5 scroll-able">
                < form onSubmit={handleSubmit(onSubmit)} >
                    <div style={{ marginTop: '100px' }}>
                        <label>Promo code</label><br />
                        <label className="form-control-lg "> {formValues.promoCodeName} </label>
                    </div>
                    <div>
                        <label>Start Date</label><br />
                        <label className="form-control-lg "> {formValues && formValues.startDate } </label>
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
                        < input name="promoDiscount" type="number" className="form-control-lg" defaultValue={formValues.promoDiscount} ref={register({ required: false })} required />
                        {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                    </div>
                    <div>
                        <label>Use Time</label><br />
                        < input name="useTime" type="number" className="form-control-lg" defaultValue={formValues.useTime} ref={register({ required: false })} required />
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
                    <button type="submit">Update Promo Code</button>
                </form >
            </div>
        </div>
    );
};

export default EditPromo;