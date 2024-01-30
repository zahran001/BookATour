import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    const [image,setImage] = useState(false);
    
    // for database
    const [routeDetails,setRouteDetails] = useState({
        name:"",
        image:"",
        location:"",
        category:"stop",

    }) 

    const imageHandler =(e)=>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setRouteDetails({...routeDetails,[e.target.name]:e.target.value})
    }

    const Add_Product = async ()=>{
        console.log(routeDetails);

        // image url
        let responseData;
        let product = routeDetails;

        let formData = new FormData();
        formData.append('product',image);

        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=> resp.json()).then((data)=>{responseData=data});
        
        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
                
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Route added"):alert("Failed")
            })
        }
    }

  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Name</p>
            <input value={routeDetails.name} onChange={changeHandler} type="text" name='name' placeholder='type route name' />
        </div>
        <div className="addproduct-location">
            <div className="addproduct-itemfield">
                <p>Location</p>
                <input value={routeDetails.location} onChange={changeHandler} type="text" name='location' placeholder='type location name' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Category</p>
            <label>
            Please select the category:
            <select value={routeDetails.category} onChange={changeHandler} name="category">
            <optgroup label="Category">
            <option value="stop">Stop</option>
            <option value="guide">Guide</option>
            </optgroup>
            </select>
            </label>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct