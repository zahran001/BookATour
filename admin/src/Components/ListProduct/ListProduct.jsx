import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import { json } from 'react-router-dom';

const ListProduct = () => {
  const [allproducts,setAllProducts] = useState([]);

  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/allproducts').then((res)=>res.json()).then((data)=>{setAllProducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  
  },[])

  const remove_product = async (id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }


  return (
    <div className='list-product'>
        <h1>Overview</h1>
        <div className="listproduct-format-main">
          <p>Routes</p>
          <p>Name</p>
          <p>Location</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproduct">
          <hr />
          {allproducts.map((product,index)=>{
            return(
              <>
              <div key={index} className="listproduct-format-main listproduct-format">
                <img className='listproduct-product-icon' src={product.image} alt="" />
                <p>{product.name}</p>
                <p>{product.location}</p>
                <p>{product.category}</p>
                <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />

              </div>
              <hr />
              </>

            )


          })}

        </div>

    </div>
  )
}

export default ListProduct