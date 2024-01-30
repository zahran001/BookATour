import React, { useContext } from 'react'
import './CSS/Category.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'



const Category = (props) => {
  const {all_product} = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <div className="shopcategory-products">
        {all_product.map((item,i)=>{
          if (props.category===item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.image} location={item.location} />

          }
          else{
            return null;
          }
        })}
      </div>

      
    </div>
  )
}

export default Category