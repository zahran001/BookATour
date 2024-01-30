import React from 'react'
import './Footer.css'
import usflogo from '../Assets/usflogo.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pinterest_icon from '../Assets/pinterest_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'




const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src={usflogo} alt="" />
            <p>BookATour</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className='footer-icons-container'>
                <img src={instagram_icon} alt="" />
            </div>
            <div className='footer-icons-container'>
                <img src={pinterest_icon} alt="" />
            </div>
            <div className='footer-icons-container'>
                <img src={whatsapp_icon} alt="" />
            </div>
        
        </div>
      
    </div>
  )
}

export default Footer