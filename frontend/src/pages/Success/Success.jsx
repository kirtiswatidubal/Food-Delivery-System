import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const confirm = async () => {
      try {
        const userId = localStorage.getItem("userId");

        // ✅ get saved order data (VERY IMPORTANT FIX)
        const savedOrder = JSON.parse(localStorage.getItem("orderData"));

        if (!savedOrder || savedOrder.items.length === 0) {
          console.log("No order data found");
          return;
        }

        await axios.post(`http://localhost:4000/api/order/confirm`, {
          userId,
          items: savedOrder.items,
          amount: savedOrder.amount,
        });

        // ✅ clear stored data after success
        localStorage.removeItem("orderData");

        // ✅ redirect to MyOrders
        navigate("/myorders");

      } catch (error) {
        console.log("SUCCESS ERROR:", error.message);
      }
    };

    confirm();
  }, []);

  return <h2 style={{ textAlign: "center" }}>Payment Successful 🎉</h2>;
};

export default Success;