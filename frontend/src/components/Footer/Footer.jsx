import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>

      <div className="footer-content">

        <div className="footer-left">
          <h2>Food Delivery</h2>
          <p>
            Enjoy delicious meals delivered to your doorstep. 
            Fast, fresh, and reliable service every time.
          </p>
          <div className='footer-social-icons'>
            <img src={assets.facebook_icon}alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />

          </div>
        </div>

       
        <div className="footer-center">
          <h3>Company</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        
        <div className="footer-right">
          <h3>Contact</h3>
          <ul>
            <li>+91 8208654729</li>
            <li>food@gmail.com</li>
          </ul>
        </div>

      </div>

      
      <hr />
      <p className="footer-bottom">
        @2026Food Delivery App. All rights reserved.
      </p>

    </div>
  )
}

export default Footer