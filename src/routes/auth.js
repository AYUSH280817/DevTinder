const express=require("express");
const authRouter=express.Router();
const bcrypt=require("bcrypt")
const {validateSignUpData}=require('../utils/validation')
const User=require("../models/user")
const jwt=require("jsonwebtoken")

//signup the user(creating new user)
authRouter.post("/signup",async(req,res)=>{
try{
    validateSignUpData(req);
    const {firstName , lastName, email,password}=req.body;
    const passwordHash=await bcrypt.hash(password,10);
    const user=new User({
        firstName,
        lastName,
        email,
        password:passwordHash
    })
await user.save();
res.send("user is succesfuly save")
}catch(err)
{
    res.send("error hai koi"+err.message)
}
})

//login the user
authRouter.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email})
        if(!email)
        {
            throw new Error("email is not valid");
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid)
        {
            throw new Error("password is not valid");
        }
       //create a jwt token
         const token= jwt.sign({_id:user._id},"DEVTINDER@28",{expiresIn:"7d"});
         res.cookie("token",token);
         res.send("user has been login")
    }catch(err){
      res.send("Error hai"+err.message)
    }
})

//logout api
authRouter.post("/logout",(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.send("logout sucessful!!")
})

module.exports=authRouter;
