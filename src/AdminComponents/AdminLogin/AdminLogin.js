import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';

const AdminLogin = () => {

    const history = useHistory();
    // const location = useLocation();
    // let { from } = location.state || { from: { pathname: "/" } }


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, reset, watch, errors } = useForm();

    const onSubmit = (userData) => { // form submit
        console.log(userData);
        fetch('http://localhost:3001/admin' , { //----------- admin info check in db
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setLoggedInUser({phone:userData.phone})
                    history.push('/admin');
                } else {
                    window.alert("Else!")
                }
            })
    }

    return (
        <div>
            <div className="text-center form-bg p-3 mt-5" style={{marginLeft:'38%' , maxWidth:'300px'}}>
                <h3>Admin Login</h3> <br/>
                < form onSubmit={handleSubmit(onSubmit)} >

                    <div  >
                        <label>User ID</label><br />
                        < input name="phone" type="text" className="form-control-lg" defaultValue="01714594910" ref={register({ required: false })} required />
                        {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                    </div>
                    <div>
                        <label>Password</label><br />
                        < input name="password" type="password" className="form-control-lg " defaultValue="12345" ref={register({ required: false })} required />
                        {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                    </div>
                    <br />
                    <button type="submit" className="btn-yellow">Login</button>
                </form >
                <br/>
                
            </div>
            <div className="mt-5 " style={{marginLeft:'45%' }}>
                    <span>User ID  :  01714594910</span>
                    <br/>
                    <span>Password :  12345</span>
                </div>
        </div>
    );
};

export default AdminLogin;