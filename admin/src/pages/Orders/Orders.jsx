import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const url = "http://localhost:4000";

  // 🔥 FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 UPDATE STATUS
  const updateStatus = async (orderId, status) => {
    try {
      await axios.post(`${url}/api/order/status`, {
        orderId,
        status,
      });

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders">
      <h2>Orders</h2>

      {orders.map((order, index) => (
        <div key={index} className="order-card">

          {/* ✅ PARCEL ICON (NOT BURGER) */}
          <div className="order-left">
            <img
              src="https://cdn-icons-png.flaticon.com/512/679/679720.png"
              alt="parcel"
            />
          </div>

          {/* DETAILS */}
          <div className="order-details">

            {/* ITEMS */}
            <p className="order-items">
              {order.items.map((item, i) => (
                <span key={i}>
                  {item.name} x {item.quantity}
                  {i !== order.items.length - 1 && ", "}
                </span>
              ))}
            </p>

            {/* ADDRESS */}
            <p className="order-address">
              {order.address?.street}, <br />
              {order.address?.city}, {order.address?.state}, <br />
              {order.address?.country}
            </p>

            {/* PHONE */}
            <p>{order.address?.phone}</p>
          </div>

          {/* RIGHT SIDE */}
          <div className="order-right">
            <p><b>Items:</b> {order.items.length}</p>
            <p><b>₹{order.amount}</b></p>

            {/* STATUS */}
            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

        </div>
      ))}
    </div>
  );
}

export default Orders;