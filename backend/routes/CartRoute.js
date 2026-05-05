import express from "express";
import userModel from "../models/userModel.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();


// ================= ADD TO CART =================
cartRouter.post("/add", authMiddleware, async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.json({
        success: false,
        message: "itemId is required"
      });
    }

    await userModel.findByIdAndUpdate(
      req.userId,
      {
        $inc: {
          [`cartData.${itemId}`]: 1
        }
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Item added to cart"
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
});


// ================= REMOVE FROM CART =================
cartRouter.post("/remove", authMiddleware, async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.json({
        success: false,
        message: "itemId is required"
      });
    }

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    let cartData = user.cartData || {};

    if (!cartData[itemId]) {
      return res.json({
        success: false,
        message: "Item not in cart"
      });
    }

    cartData[itemId] -= 1;

    if (cartData[itemId] <= 0) {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(req.userId, {
      cartData
    });

    res.json({
      success: true,
      message: "Item removed from cart"
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
});


cartRouter.post("/get", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      cartData: user.cartData || {}
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
});
export default cartRouter;

