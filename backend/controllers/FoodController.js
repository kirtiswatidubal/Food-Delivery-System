

// import FoodModel from "../models/FoodModel.js";
// import fs from "fs";

// // add food item
// const addFood = async (req, res) => {
//   try {
//     let image_filename = `${req.file.filename}`;

//     const food = new FoodModel({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       category: req.body.category,
//       image: image_filename
//     });

//     await food.save();

//     res.json({
//       success: true,
//       message: "Food Added"
//     });

//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Error"
//     });
//   }
// };

// // get all food items
// const listFood = async (req, res) => {
//   try {
//     const foods = await FoodModel.find({});
//     res.json({
//       success: true,
//       data: foods
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Error"
//     });
//   }
// };

// // remove food item
// const removeFood = async (req, res) => {
//   try {
//     const food = await FoodModel.findById(req.body.id);

//     // delete image from uploads folder
//     fs.unlink(`uploads/${food.image}`, () => {});

//     await FoodModel.findByIdAndDelete(req.body.id);

//     res.json({
//       success: true,
//       message: "Food Removed"
//     });

//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Error"
//     });
//   }
// };

// export { addFood, listFood, removeFood };
import FoodModel from "../models/FoodModel.js";
import fs from "fs";

// ✅ ADD FOOD
const addFood = async (req, res) => {
  try {
    // 🔥 IMPORTANT CHECK
    if (!req.file) {
      return res.json({
        success: false,
        message: "Image not uploaded"
      });
    }

    const food = new FoodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.filename
    });

    await food.save();

    res.json({
      success: true,
      message: "Food Added"
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error"
    });
  }
};

// ✅ LIST FOOD
const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.json({
      success: true,
      data: foods
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error"
    });
  }
};

// ✅ REMOVE FOOD
const removeFood = async (req, res) => {
  try {
    const food = await FoodModel.findById(req.body.id);

    if (food) {
      fs.unlink(`uploads/${food.image}`, () => {});
      await FoodModel.findByIdAndDelete(req.body.id);
    }

    res.json({
      success: true,
      message: "Food Removed"
    });

  } catch (error) {
    res.json({
      success: false,
      message: "Error"
    });
  }
};

export { addFood, listFood, removeFood };