import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_route_icon from '../../assets/destination.png'
import list_route_icon from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={add_route_icon} alt="" />
                <p>Add Route</p>
            </div>
        </Link> 

        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={list_route_icon} alt="" />
                <p>Overview</p>
            </div>
        </Link> 
    </div>
  )
}

export default Sidebar