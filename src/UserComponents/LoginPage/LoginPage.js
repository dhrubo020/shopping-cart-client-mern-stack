import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const LoginPage = () => {

    const history = useHistory();
    // const location = useLocation();
    // let { from } = location.state || { from: { pathname: "/" } }


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, reset, watch, errors } = useForm();

    const onSubmit = (userData) => { // form submit
        console.log(userData);
        fetch('http://localhost:3001/user' , { //----------- user to db
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setLoggedInUser({phone:userData.phone})
                    history.push('/cart');
                } else {
                    window.alert("Else!")
                }
            })
    }
    return (
        <div className="text-center form-bg p-3 mt-5" style={{marginLeft:'38%', maxWidth:'300px'}}>
            <h3>Login</h3>
            < form onSubmit={handleSubmit(onSubmit)} >

                <div >
                    <label>Phone Number</label><br />
                    < input name="phone" type="text" className="form-control-lg" ref={register({ required: false })} required/>
                    {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                </div>
                <div>
                    <label>Password</label><br />
                    < input name="password" type="password" className="form-control-lg "  ref={register({ required: false })} required/>
                    {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                </div>
                <br />
                <button type="submit" className="btn-yellow">Login</button>
            </form >
        </div>
    );
};

export default LoginPage;