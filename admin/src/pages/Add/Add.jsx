import React, { useState } from "react";
import axios from "axios";
import "./Add.css";

function Add() {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 🔥 CHECK IMAGE
    if (!image) {
      alert("Please upload image");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/food/add",
        formData
      );

      console.log(response.data);

      if (response.data.success) {
        alert("Food Added Successfully");

        // reset form
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
      } else {
        alert("Failed to add food");
      }

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Error adding food");
    }
  };
  

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        
        {/* IMAGE */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>

          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://via.placeholder.com/150"
              }
              alt=""
              className="upload-preview"
            />
          </label>

          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* NAME */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            type="text"
            placeholder="Type here"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="add-product-description flex-col">
          <p>Description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            placeholder="Write content here"
          />
        </div>

        {/* CATEGORY + PRICE */}
        <div className="add-category-price">
          <select
            name="category"
            value={data.category}
            onChange={onChangeHandler}
          >
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Desserts">Desserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>

          <input
            type="number"
            name="price"
            value={data.price}
            placeholder="Price"
            onChange={onChangeHandler}
          />
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
}

export default Add;