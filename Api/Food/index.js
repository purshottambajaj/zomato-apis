//Libraries
import express from "express";
//import passport from "passport";

//Database Model
import {FoodModel} from "../../database/food/index.js";

//Validation


const food = express.Router();

/*
Route            /
Des              Get all the foods based on particular restaurant
Params           _id
Access           Public
Method           GET
*/

food.get("/:_id", async(req,res) => {
  try {
   

    const {_id} = req.params;
    const foods = await FoodModel.find({ restaurant: _id });

    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

/*
Route            /r
Des              Get all the foods based on particular category
Params           category
Access           Public
Method           GET
*/

food.get("/r/:category", async(req,res) => {
  try {
   await ValidateCategory(req.params);

    const {category} = req.params;
    const foods = await FoodModel.find({
      category: { $regex: category, $options: "i"}
    });

    return res.json({foods});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
})


export default food;
