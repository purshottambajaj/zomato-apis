import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from 'passport';
const user = express.Router();

//Models
import { UserModel } from "../../database/user/index.js";




user.post("/signup", async (req, res) => {
   try {
      const {email,password,fullname,phoneNumber}= req.body.credentials;

     await UserModel.findEmailAndPhone(req.body.credentials);

           
//DB
//const newUser = await UserModel.create(req.body.credentials);

//JWT Auth Token
//const token = newUser.generateJwtToken();

return res.status(200).json({token});

} catch (error) {
 return res.status(500).json({error: error.message});
}
});


user.post("/signin", async(req,res) => {
   try {
 
 
     const user = await UserModel.findByEmailAndPassword(
       req.body.credentials
     );
 
    //JWT Auth Token
    const token = user.generateJwtToken();
 
    return res.status(200).json({token, status: "Success"});
 
   } catch (error) {
     return res.status(500).json({error: error.message});
   }
 });
 

 user.get("/google", passport.authenticate("google",{
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ],
  })
  );
  
  
user.get("/google/callback", passport.authenticate("google",{failureRedirect: "/"}),
(req,res) => {
  return res.json({token: req.session.passport.user.token});
}
);


export default user;
