import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div
      className="header"
      style={{ backgroundImage: `url('/header_img.png')` }}
    >
      <div className="header-content">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a wide array of dishes crafted
          with the finest ingredients and culinary expertise.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header