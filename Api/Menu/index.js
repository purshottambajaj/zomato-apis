//Libraries

import express from "express";

//Database Model
import {MenuModel} from "../../database/menu/index.js";
import {ImageModel} from "../../database/image/index.js"
const menu = express.Router();

/*
Route            /list
Des              Get the list of menu based on id
Params           _id
Access           Public
Method           GET
*/

menu.get("/list/:_id", async(req,res)=> {
  try {
    const {_id} = req.params;
    const menus = await MenuModel.findOne(_id);

    return res.json({menus});

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

/*
Route            /image
Des              get menu image based on id
Params           _id
Access           Public
Method           GET
*/

menu.get("/image/:_id", async(req,res)=> {
  try {
    const {_id} = req.params;
    const menus = await ImageModel.findOne(_id);

    return res.json({menus});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

export default menu;
