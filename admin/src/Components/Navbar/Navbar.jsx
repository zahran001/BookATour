import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navProfile from  '../../assets/nav-profile.svg'


const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" className="nav-logo" />
        <p>Admin Panel</p>         
    </div>
  )
}

export default Navbar