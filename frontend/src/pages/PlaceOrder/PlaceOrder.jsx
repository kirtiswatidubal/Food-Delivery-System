import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { cartItems, food_list, url } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    try {
      setLoading(true);

      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first");
        return;
      }

      let orderItems = [];

      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          orderItems.push({
            _id: item._id,
            name: item.name,
            price: item.price,
            quantity: cartItems[item._id],
          });
        }
      });

      const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      if (orderItems.length === 0) {
        alert("Cart is empty");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "orderData",
        JSON.stringify({
          items: orderItems,
          amount: totalAmount,
        })
      );

      const response = await axios.post(`${url}/api/order/place`, {
        userId,
        items: orderItems,
        amount: totalAmount,
      });

      if (response.data.success && response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert(response.data.message || "Error");
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalAmount = () => {
    let total = 0;
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id];
      }
    });
    return total;
  };

  return (
    <div className="place-order">

      {/* LEFT FORM */}
      <div className="place-order-left">
        <h2>Delivery Information</h2>

        <input placeholder="Full Name" />
        <input placeholder="Email" />
        <input placeholder="Address" />
        <input placeholder="City" />
        <input placeholder="State" />
        <input placeholder="Zip Code" />
        <input placeholder="Country" />
        <input placeholder="Phone" />
      </div>

      {/* RIGHT SUMMARY */}
      <div className="place-order-right">
        <h2>Cart Total</h2>

        <div>
          <p>Subtotal</p>
          <p>₹{getTotalAmount()}</p>
        </div>

        <div>
          <p>Delivery Fee</p>
          <p>₹2</p>
        </div>

        <div>
          <b>Total</b>
          <b>₹{getTotalAmount() + 2}</b>
        </div>

        <button onClick={placeOrder} disabled={loading}>
          {loading ? "Processing..." : "PROCEED TO PAYMENT"}
        </button>
      </div>

    </div>
  );
};

export default PlaceOrder;