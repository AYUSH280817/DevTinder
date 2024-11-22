const express=require('express')
const profileRouter=express.Router()
const userAuth=require("../middlewares/auth");
const { validateEditProfileData } = require('../utils/validation');

//view the profile
profileRouter.get("/profile",userAuth,async(req,res)=>{
    const user=req.user;
    res.send(user);
 })

 //edit the profile
 profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData)
            {
                throw new Error("invalid edit profile");
            }
            const loginuser=req.user;
          Object.keys(req.body).forEach(key=>loginuser[key]=req.body[key])
          await loginuser.save();
          console.log(loginuser);
          res.send(`${loginuser.firstName},your profile is upadted`)
    }
    catch(err)
    {
       res.send("err"+err.message)
    }


 })
 module.exports=profileRouter;