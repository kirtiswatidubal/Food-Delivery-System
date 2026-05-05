import React, { useState, useContext } from "react";
import axios from "axios";
import "./LoginPopup.css";
import { StoreContext } from "../../Context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      let endpoint = "";
      let payload = {};

      if (currState === "Sign Up") {
        endpoint = "/api/user/register";
        payload = {
          name: data.name,
          email: data.email,
          password: data.password
        };
      } else {
        endpoint = "/api/user/login";
        payload = {
          email: data.email,
          password: data.password
        };
      }

      const res = await axios.post(url + endpoint, payload);

      console.log("LOGIN RESPONSE:", res.data);

      // ❌ Stop if failed
      if (!res.data.success) {
        alert(res.data.message || "Something went wrong");
        return;
      }

      // ✅ Store token
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      // 🔥 FIXED: Store userId properly
      if (res.data.userId) {
        localStorage.setItem("userId", res.data.userId);
      } else {
        console.warn("userId not received from backend");
      }

      // ✅ Clear form
      setData({
        name: "",
        email: "",
        password: ""
      });

      // ✅ Close popup
      setShowLogin(false);

    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>

        {/* HEADER */}
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <span onClick={() => setShowLogin(false)}>✖</span>
        </div>

        {/* INPUTS */}
        <div className="login-popup-inputs">

          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* BUTTON */}
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* SWITCH */}
        <p>
          {currState === "Login" ? (
            <>
              Create account?
              <span onClick={() => setCurrState("Sign Up")}> Click here</span>
            </>
          ) : (
            <>
              Already have account?
              <span onClick={() => setCurrState("Login")}> Login here</span>
            </>
          )}
        </p>

      </form>
    </div>
  );
};

export default LoginPopup;