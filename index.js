import 'dotenv/config'
import mongoose from 'mongoose';
import express from "express";
import session from 'express-session';
import cors from "cors";
import helmet from "helmet";

import  Router   from './Api/Auth/index.js';
import restaurant from './Api/Restaurant/index.js';
import food from './Api/Food/index.js';
import menu from './Api/Menu/index.js';
import image from './Api/Images/index.js';
import order from './Api/orders/index.js';
import review from './Api/reviews/index.js';
import user from './Api/User/index.js';

import passport from 'passport';
import googleAuthConfig from './config/google.comfig.js';

const zomato = express();



zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(helmet());
zomato.use(cors());

zomato.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true
  }));

  
zomato.use(passport.initialize());
zomato.use(passport.session());


googleAuthConfig(passport);

zomato.get("/", (req,res) => res.json({message: "SetUp Done!"}));



zomato.use("/auth",Router);
zomato.use("/restaurant",restaurant);
zomato.use("/food",food);
zomato.use("/menu",menu);
zomato.use("/image",image);
zomato.use("/order",order);
zomato.use("/review",review);
zomato.use("/user",user);



zomato.listen(4000, ()=> {
 
    mongoose.connect(process.env.Mongo_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err)); 
});