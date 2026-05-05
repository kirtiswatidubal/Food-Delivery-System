import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import FoodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import orderRouter from "./routes/OrderRoute.js";


dotenv.config();
const app = express();
const port = 4000;

// fix for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/user", userRouter);
app.use("/api/food", FoodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
// ✅ FIXED STATIC FILE SERVING
app.use("/images", express.static(path.join(__dirname, "uploads")));

// test route
app.get("/", (req, res) => {
  res.send("API Working");
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// db + server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

