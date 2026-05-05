import React, { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";

function List() {
  const [list, setList] = useState([]);

  // 🔥 FETCH DATA
  const fetchList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/food/list"
      );

      if (res.data.success) {
        setList(res.data.data);
      } else {
        console.log("Failed to fetch list");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 DELETE FUNCTION
  const removeItem = async (id) => {
    // ✅ confirm before delete
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.post(
        "http://localhost:4000/api/food/remove",
        { id }
      );

      if (res.data.success) {
        alert("Item removed successfully ✅");
        fetchList(); // refresh
      } else {
        alert("Failed to remove item ❌");
      }

    } catch (error) {
      console.log(error);
      alert("Error removing item ❌");
    }
  };

  // 🔥 LOAD DATA
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      <div className="list-table">

        {/* HEADER */}
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* EMPTY STATE */}
        {list.length === 0 && (
          <p style={{ padding: "20px" }}>No items found</p>
        )}

        {/* DATA */}
        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            
            {/* IMAGE */}
            <img
              src={`http://localhost:4000/images/${item.image}`}
              alt=""
              className="list-img"
            />

            {/* INFO */}
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>

            {/* DELETE */}
            <p
              style={{ cursor: "pointer", color: "black", fontWeight: "bold" }}
              onClick={() => removeItem(item._id)}
            >
              🗑
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;