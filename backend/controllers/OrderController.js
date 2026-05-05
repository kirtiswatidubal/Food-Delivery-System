
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ================= CLEAN ITEMS =================
const cleanItems = (items) => {
  return (Array.isArray(items) ? items : [])
    .filter((item) => item && item.quantity > 0)
    .map((item) => ({
      _id: item._id,
      name: item.name,
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 0),
    }));
};

// ================= PLACE ORDER =================
export const placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const items = cleanItems(req.body.items);

    if (!userId) {
      return res.json({ success: false, message: "User not found" });
    }

    if (items.length === 0) {
      return res.json({ success: false, message: "Cart empty" });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (totalAmount < 50) {
      return res.json({
        success: false,
        message: "Minimum order value is ₹50",
      });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",

      metadata: {
        userId: userId,
        items: JSON.stringify(items),
        amount: totalAmount.toString(),
      },

      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cart",
    });

    res.json({
      success: true,
      url: session.url,
    });

  } catch (error) {
    console.log("PLACE ORDER ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// ================= CONFIRM ORDER =================
export const confirmOrder = async (req, res) => {
  try {
    let { userId, items, amount } = req.body;

    if (typeof items === "string") {
      items = JSON.parse(items);
    }

    const cleanedItems = cleanItems(items);

    if (!userId || cleanedItems.length === 0) {
      return res.json({
        success: false,
        message: "Invalid order data",
      });
    }

    const order = await orderModel.create({
      userId,
      items: cleanedItems,
      amount: Number(amount || 0),
      status: "Food Processing",
      payment: true,
    });

    res.json({
      success: true,
      order,
    });

  } catch (error) {
    console.log("CONFIRM ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// ================= USER ORDERS =================
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "No userId" });
    }

    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });

  } catch (error) {
    console.log("USER ORDERS ERROR:", error.message);
    res.json({ success: false });
  }
};

// ================= ADMIN - LIST =================
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });

  } catch (error) {
    console.log("LIST ERROR:", error.message);
    res.json({ success: false });
  }
};

// ================= STATUS UPDATE =================
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({
        success: false,
        message: "Missing orderId or status",
      });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // 🔥 IMPORTANT: returns updated doc
    );

    if (!updatedOrder) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      data: updatedOrder,
    });

  } catch (error) {
    console.log("STATUS ERROR:", error.message);
    res.json({ success: false });
  }
};