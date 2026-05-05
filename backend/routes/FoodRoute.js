
import express from "express";
import multer from "multer";
import fs from "fs";
import { addFood, listFood, removeFood } from "../controllers/FoodController.js";

const FoodRouter = express.Router();

// ✅ ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ✅ multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ✅ routes
FoodRouter.post("/add", upload.single("image"), addFood);
FoodRouter.get("/list", listFood);
FoodRouter.post("/remove", removeFood);

export default FoodRouter;
