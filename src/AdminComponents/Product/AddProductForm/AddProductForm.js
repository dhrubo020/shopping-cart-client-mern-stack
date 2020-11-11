import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Axios from 'axios';
import Resizer from 'react-image-file-resizer';


import './AddProductForm.css'
import { useHistory } from 'react-router-dom';

const AddProductForm = () => {

    const history = useHistory();
    const [imageUrl, setImageUrl] = useState('');
    const [active, setActive] = useState(false);
    const [productData, setProductData] = useState({});


    const { register, handleSubmit, reset, watch, errors } = useForm();

    const onSubmit = data => { // form submit
 
        if(imageUrl.length === 0){
            window.alert("Please upload product image.")
            return 0;
        }
        const newProductInfo = { ...data, active: active, imageUrl: imageUrl }
        console.log(newProductInfo)
        setProductData(newProductInfo)

        fetch('http://localhost:3001/addProduct' , { //----------- post product to db
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProductInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    window.alert("Item added successfully!")
                    history.push('/admin')
                } else {
                    window.alert("Else!")
                }
            })
        
    };



    const resizeFile = (file) => new Promise(resolve => { //---------- resize image 500x500
        Resizer.imageFileResizer(file, 500, 500, 'JPEG'
            , 100, 0,
            uri => {
                resolve(uri);
            },
            'blob'
        );
    });


    const uploadImage = (img) => { //----------- upload image to cloud (imagebb) & get link
        let body = new FormData()
        body.set('key', '487bbc78512fb205a6c29d2bb714749b')
        body.append('image', img)

        return Axios({
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            data: body
        })
    }
    const upload = async (e) => { // image customization 
        const file = e.target.files[0];
        const image = await resizeFile(file);
        setImageUrl(image);
        // const newProductInfo = { ...productData, imageUrl: imageUrl };
        // console.log(newProductInfo);
        // setProductData(newProductInfo);

        uploadImage(image)
            .then(resp => {
                // console.log(resp.data.data.thumb.url) // I'm aware it's data.data, that is how it returns stuff
                // const newObject = { ...serviceInfo }
                // newObject.imageUrl = resp.data.data.image.url;
                // setServiceInfo(newObject);
                console.log(resp.data.data.image.url)
                setImageUrl(resp.data.data.image.url);
            })
        e.preventDefault();
    }



    return (

        <div>
            <div className="center my-5 scroll-able">

                <div style={{ marginTop: '200px' }}>
                    <label>Product Image</label><br />
                    <input onChange={upload} type="file" name="myFile" />
                    <br />
                    {
                        imageUrl ? <img src={`${imageUrl}`} />  : <small className="text-mute">Image will be appeared here</small>
                    }
                    <br />
                </div>

                < form onSubmit={handleSubmit(onSubmit)} >

                    <div style={{ marginTop: '200px' }}>
                        <label>Product Name</label><br />
                        < input name="name" className="form-control-lg" defaultValue="name" ref={register({ required: false })} />
                        {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                    </div>
                    <div>
                        <label>Product Price (Without Discount)</label><br />
                        < input name="price" className="form-control-lg " defaultValue="100" ref={register({ required: false })} />
                        {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                    </div>
                    <div>
                        <label>Discount %</label><br />
                        < input name="discount" className="form-control-lg" defaultValue="5" ref={register({ required: false })} />
                        {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                    </div>
                    <div>
                        <label>Shipping Charge</label><br />
                        < input name="shippingCharge" className="form-control-lg" defaultValue="2" ref={register({ required: false })} />
                        {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                    </div>
                    <div>
                        <label>Color</label><br />
                        < input name="color" className="form-control-lg" defaultValue="red" ref={register({ required: false })} />
                        {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                    </div>
                    <div>
                        <label>Size</label><br />
                        < input name="size" className="form-control-lg" defaultValue="XL" ref={register({ required: false })} />
                        {/* {errors.exampleRequired && <><br/><small className="input-warning"> This field is required</small> </> } */}
                    </div>
                    <div >
                        <br />
                        <label>Active</label>
                        <div style={{ display: 'inline-block', float: 'right' }} className="custom-control custom-switch" >
                            <input type="checkbox" onClick={() => setActive(!active)} className="custom-control-input form-control-lg" id="customSwitch1" />
                            <label className="custom-control-label" for="customSwitch1"></label>
                        </div>
                    </div>

                    <br />
                    <button type="submit">Add Product</button>
                </form >
            </div>
        </div>
    );
};

export default AddProductForm;