const express=require("express");
const authRouter=express.Router();
const bcrypt=require("bcrypt")
const {validateSignUpData}=require('../utils/validation')
const User=require("../models/user")
const jwt=require( "jsonwebtoken")

//signup the user(creating new user)
authRouter.post("/signup",async(req,res)=>{
try{
    validateSignUpData(req);
    const {firstName , lastName, email,password,photoUrl,age,gender}=req.body;
    const passwordHash=await bcrypt.hash(password,10);
    const user=new User({
        firstName,
        lastName,
        email,
        password:passwordHash,
        photoUrl,
        age,
        gender
    })
const savedUser=await user.save();
const token =await savedUser.getJWT()
res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true,
  });
  
res.json({message:"user is succesfuly save",data:savedUser,token})
}catch(err)
{
    res.send("error hai koi"+err.message)
}
})

//login the user
authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, "DEVTINDER@28", { expiresIn: "7d" });

        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true,
        });

        res.json({ user, token }); // Send user data and token in the response
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).send("Error during login: " + err.message);
    }
});

//logout api
authRouter.post("/logout",(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.send("logout sucessful!!")
})

module.exports=authRouter;
