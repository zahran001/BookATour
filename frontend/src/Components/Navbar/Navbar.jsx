import React, { useContext, useState } from 'react'
import './Navbar.css'
import usflogo from '../Assets/usflogo.png'
import destination from '../Assets/destination.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
    const [menu,setMenu] =  useState("home");
    const {getTotalCartItems} =useContext(ShopContext);

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={usflogo} alt="logo" />
            <p>BookATour</p>
        </div>

        <ul className="nav-menu">
            <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration: 'none'}} to='/'> Home </Link>{menu==="home" ? <hr /> : <></>}</li>
            <li onClick={()=>{setMenu("stops")}}><Link style={{textDecoration: 'none'}} to='/stops'> Stops </Link>{menu==="stops" ? <hr /> : <></>}</li>
            <li onClick={()=>{setMenu("guides")}}><Link style={{textDecoration: 'none'}} to='/guides'> Offices </Link>{menu==="guides" ? <hr /> : <></>}</li>
        </ul>
        <div className="nav-login-cart">
            {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
            <Link to='/login'> <button>Login</button> </Link>}

            
            
            <Link to='/cart'> <img src={destination} alt="cart" /> </Link>
            <div className="nav-stop-count">
                {getTotalCartItems()}
            </div>
        </div>


    </div>
  )
}

export default Navbar




