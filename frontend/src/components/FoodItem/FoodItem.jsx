import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

const FoodItem = ({ _id, name, price, description, image, rating }) => {

  const { url, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);

  return (
    <div className="food-item">

      {/* IMAGE SECTION */}
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={`${url}/images/${image}`}
          alt={name}
        />

        {/* ADD / COUNTER */}
        {!cartItems[_id] ? (
          <img
            className="add"
            onClick={() => addToCart(_id)}
            src={assets.add_icon_white}
            alt="add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(_id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[_id]}</p>
            <img
              onClick={() => addToCart(_id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>

      {/* INFO SECTION */}
      <div className="food-item-info">

        {/* NAME + RATING */}
        <div className="food-item-name-rating">
          <p className="food-item-name">{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>

        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>

      </div>

    </div>
  );
};

export default FoodItem;