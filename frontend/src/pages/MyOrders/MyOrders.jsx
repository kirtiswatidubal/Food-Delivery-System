import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.log("No userId found");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/api/order/userorders",
        { userId }
      );

      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.log("MY ORDERS ERROR:", error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      <div className="container">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order, index) => {
            const items = order.items || [];

            const totalItems = items.reduce(
              (sum, item) => sum + (item.quantity || 0),
              0
            );

            return (
              <div key={index} className="my-orders-order">

                {/* IMAGE */}
                <img src="/parcel_icon.png" alt="parcel" />

                {/* ITEMS LIST */}
                <p className="order-items">
                  {items.length > 0 ? (
                    items.map((item, i) => (
                      <span key={i}>
                        {item.name} x {item.quantity}
                        {i !== items.length - 1 && ", "}
                      </span>
                    ))
                  ) : (
                    <span>No items</span>
                  )}
                </p>

                {/* AMOUNT */}
                <p className="order-amount">₹{order.amount}</p>

                {/* TOTAL ITEMS */}
                <p className="order-count">Items: {totalItems}</p>

                {/* STATUS */}
                <p className="order-status">
                  <span className="status-dot"></span> {order.status}
                </p>

                {/* BUTTON */}
                <button>Track Order</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyOrders;