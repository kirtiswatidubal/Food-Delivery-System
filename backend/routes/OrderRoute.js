
// import express from "express";

// // ✅ import controller functions
// import {
//   placeOrder,
//   confirmOrder,
//   userOrders,
//   listOrders,
//   updateStatus
// } from "../controllers/orderController.js"; // ⚠️ make sure file name matches exactly

// const orderRouter = express.Router();

// // ================= USER ROUTES =================

// // 🔹 Create Stripe payment session
// orderRouter.post("/place", placeOrder);

// // 🔹 Confirm order after payment success (VERY IMPORTANT)
// orderRouter.post("/confirm", confirmOrder);

// // 🔹 Get logged-in user's orders
// orderRouter.post("/userorders", userOrders);


// // ================= ADMIN ROUTES =================

// // 🔹 Get all orders (admin)
// orderRouter.get("/list", listOrders);

// // 🔹 Update order status (admin)
// orderRouter.post("/status", updateStatus);


// export default orderRouter;

import express from "express";

import {
  placeOrder,
  confirmOrder,
  userOrders,
  listOrders,
  updateStatus
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// ================= USER ROUTES =================
orderRouter.post("/place", placeOrder);
orderRouter.post("/confirm", confirmOrder);
orderRouter.post("/userorders", userOrders);

// ================= ADMIN ROUTES =================
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;