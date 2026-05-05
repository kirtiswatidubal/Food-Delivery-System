
import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import logo from '../../assets/Quickbites.png'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home")

  // ✅ FIX: move inside component
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")   // ✅ better than reload
  }

  return (
    <div className="navbar">

      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>

      <ul className="navbar-menu">

        <a href="#" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</a>

        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>

        <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>

        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>

      </ul>

      <div className="navbar-right">

        <img src={assets.search_icon} alt="search" />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          <div className="dot"></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile" />

            <ul className="nav-profile-dropdown">

              {/* ✅ FIXED navigation */}
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>

              <hr />

              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>

            </ul>
          </div>
        )}

      </div>

    </div>
  )
}

export default Navbar