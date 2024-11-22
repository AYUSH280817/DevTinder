// const express = require("express");
// const connectDB = require("./config/database");
// const app = express();
// const User = require("./models/user");
// const bcrypt= require('bcrypt'); 
// const validateSignUpData=require('./utils/validation');
// const cookieParser = require("cookie-parser");
// const jwt=require("jsonwebtoken")
// const userAuth=require("./middlewares/auth")
// app.use(express.json());
// app.use(cookieParser());
// connectDB()
//   .then(() => {
//     app.listen(3000, () => {
//       console.log("Server is successfully running on port 3000");
//     });
//   })
//   .catch((err) => {
//     console.log("Server failed to connect: " + err.message);
//   });
// // Post new user

// app.post("/signup", async (req, res) => {
  
//   try {
//     //validation of data
//    validateSignUpData(req)
//   //encrypt the password
//     const {firstName,lastName,email,password}=req.body;
//     const passwordHash=await bcrypt.hash(password,10);
//     const user = new User({
//       firstName,
//       lastName,
//       email,
//       password:passwordHash
//     });
//     await user.save();
//     res.status(201).send({ message: "User created successfully", user });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// //get the user
// app.get("/user",async(req,res)=>{
//   const useremail=req.body.email;
//   const emailfind=await User.find({email:useremail})
//   if(emailfind.length===0)
//   {
//     res.status(404).send("did not find")
//   }
//   else{
//     res.send(emailfind)
//   } 
// })
// //update the user
// app.patch("/user", async (req, res) => {
//     const userid = req.body.userid; 
//     const data = req.body;
//     try{
//         const ALLOWED_UPDATE = ["userid", "age", "gender"];
//         const isUpdateAllowed = Object.keys(data).every((key) =>
//         ALLOWED_UPDATE.includes(key)  
//         );
//         if (!isUpdateAllowed) {
//             throw new Error("Invalid fields for update");
//         }
//         const user = await User.findByIdAndUpdate(userid, data, {
//             returnDocument: "after",
//             runValidators: true,
//         });
//         if (!user) { 
//             return res.status(404).send("User not found");
//         }
//         res.send(" Update successful ");
//     } catch(err){
//         res.status(400).send("Error:"+err.message);
//     }
//   });
// //login the data
// app.post("/login",async(req,res)=>{
//   try{
//     const {email,password}=req.body ;
//     const user=await User.findOne({email:email})
//     // console.log(user);
//     if(!user)
//     {
//       throw new Error("invalid email");
//     }  
//       const isPasswordValid=await bcrypt.compare(password,user.password); 
//        if(isPasswordValid)
//        {
//            //create a JWT token
//            const token=await jwt.sign({_id:user._id},"DEVTINDER@28",{expiresIn:"1h"})
//            res.cookie("token",token);
//            res.send("token is send");
//        }
//        else{
//         throw new Error("password is not valid") 
//        }
//   }catch(err)
//   {
// res.status(400).send("Error"+err.message);
//   }
// }) 
// //profile
// app.get("/profile",userAuth,async(req,res)=>{
//   const user=req.user;
//   res.send(user);
// })

const express=require("express");
const app=express();
const User=require("./models/user");
const connectDB = require("./config/database");
const jwt=require("jsonwebtoken")

const cookieParser = require("cookie-parser");
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/requests")
app.use(express.json());
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
connectDB()
.then(()=>{
  app.listen(3000,()=>{
  console.log("server is succesfuly run on port 3000")
  })
})
.catch((err)=>{
  console.log("server is not runing on the port")
})

//add a new user
// app.post("/signup",async(req,res)=>{
//   try{
//      validateSignUpData(req);
//     const {firstName,lastName,password,email}=req.body;
//     const passwordHash=await bcrypt.hash(password,10);
//     const user=new User({
//      firstName,
//      lastName,
//      email,
//      password:passwordHash
//     })
//   await user.save();
//   res.send("user is post sucessfully");
//   }catch(err)
//    {
//     res.send("err hai"+err.message);
//    }
// })

// //user login
//  app.post("/login",async(req,res)=>{
//   try{
//     const {email,password}=req.body;
//     const user= await User.findOne({email:email});
//     if(!user)
//     {
//       throw new Error("user is not valid");
//     }
//     const isPasswordValid=await bcrypt.compare(password,user.password)
//     if(isPasswordValid)
//     {
//       //create a Jwt token
//       const token=jwt.sign({_id:user._id},"DEVTINDER@28",{expiresIn:"1h"})
//       res.cookie("token",token)
//       res.send("token is send");
//     }
//     else{
//       throw new Error("password is not valid");     
//     }
//   }catch(err){
//     res.send("err hai "+err.message);
//   }
//  })

//  ///user profile
//  app.get("/profile",userAuth,(req,res)=>{
//     const user=req.user;
//     res.send(user);
//  })

