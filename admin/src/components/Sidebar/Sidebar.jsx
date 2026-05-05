import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        {/* <li>Add Items</li> */}
        {/* <li>List Items</li> */}
        {/* <li>Orders</li> */}
        <li><Link to="/add">Add Items</Link></li>
        <li><Link to="/list">List Items</Link></li>
        <li><Link to="/orders">Orders</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
