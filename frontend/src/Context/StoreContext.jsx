import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";

  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});

  // ================= FOOD =================
  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) setFoodList(res.data.data);
    } catch (err) {
      console.log("Food error:", err);
    }
  };

  // ================= CART =================
  const fetchCart = async (token) => {
    try {
      if (!token) return;

      const res = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        setCartItems(res.data.cartData || {});
      }
    } catch (err) {
      console.log("Cart error:", err);
    }
  };

  // ================= ADD =================
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  // ================= REMOVE =================
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      updated[itemId] -= 1;
      if (updated[itemId] <= 0) delete updated[itemId];
      return updated;
    });

    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  // ================= TOTAL =================
  const getTotalCartAmount = () => {
    let total = 0;

    food_list.forEach((item) => {
      const qty = cartItems[item._id] || 0;
      if (qty > 0) total += item.price * qty;
    });

    return total;
  };

  // ================= INIT =================
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      fetchCart(savedToken);
    }
  }, []);

  useEffect(() => {
    fetchFoodList();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        url,
        food_list,
        token,
        setToken,
        cartItems,
        setCartItems, // 🔥 IMPORTANT FIX
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        fetchCart,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;