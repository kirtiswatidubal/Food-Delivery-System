import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { food_list, cartItems, removeFromCart, addToCart, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  // ✅ Safety check (prevents blank screen)
  if (!food_list || !cartItems) {
    return <div className="cart">Loading Cart...</div>;
  }

  // ✅ Total calculation
  const getTotalAmount = () => {
    let total = 0;

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id];
      }
    });

    return total;
  };

  const totalAmount = getTotalAmount();
  const deliveryFee = totalAmount === 0 ? 0 : 2;

  return (
    <div className="cart">

      {/* HEADER */}
      <div className="cart-items-title">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Action</p>
      </div>

      <hr />

      {/* EMPTY CART CHECK */}
      {totalAmount === 0 ? (
        <h3 style={{ textAlign: "center", marginTop: "20px" }}>
          Your cart is empty
        </h3>
      ) : (
        food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">

                  {/* IMAGE */}
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                  />

                  {/* NAME */}
                  <p>{item.name}</p>

                  {/* PRICE */}
                  <p>₹{item.price}</p>

                  {/* QUANTITY */}
                  <div className="cart-qty">
                    <button onClick={() => removeFromCart(item._id)}>
                      -
                    </button>

                    <span>{cartItems[item._id]}</span>

                    <button onClick={() => addToCart(item._id)}>
                      +
                    </button>
                  </div>

                  {/* TOTAL */}
                  <p>
                    ₹{item.price * cartItems[item._id]}
                  </p>

                  {/* REMOVE */}
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    🗑
                  </button>
                </div>

                <hr />
              </div>
            );
          }
          return null;
        })
      )}

      {/* BOTTOM SECTION */}
      <div className="cart-bottom">

        {/* TOTAL */}
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{totalAmount}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{totalAmount + deliveryFee}</b>
          </div>

          <button
            className="checkout-btn"
            disabled={totalAmount === 0}
            onClick={() => navigate("/order")}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* PROMO CODE */}
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>

          <div className="cart-promocode-input">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;