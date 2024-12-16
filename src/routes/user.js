const express=require("express");
const userAuth = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const requestRouter = require("./requests");
const User = require("../models/user");
const userRouter=express.Router();
const USER_SAFE_DATA="firstName lastName photoUrl age gender "

userRouter.get("/user/requests/received",
    userAuth,
    async(req,res)=>{
    try{
     const loggedUser=req.user
    const connection=await connectionRequest.find({
      toUserId:loggedUser._id,
      status:"interested",  
    }).populate("fromUserId",USER_SAFE_DATA)
    res.json({
        message:"data fetched successfully",
        data:connection
    })
    }catch(err){
    req.statusCode(400).send("Error",+err.message)
    }
})
userRouter.get("/user/connection",
    userAuth,
    async(req,res)=>{
        try{
         const loggedUser=req.user;
         const connection=await connectionRequest.find({
            $or:[
                {toUserId:loggedUser._id,status:"accepted"},
                {toUserId:loggedUser._id,status:"accepted"}
            ]   
         })
         .populate("fromUserId",USER_SAFE_DATA)
         .populate("toUserId",USER_SAFE_DATA)
         const data=connection.map((row)=>row.fromUserId)
         res.json({
            data
         })
        }catch(err){
        res.send("error"+err.message)
        }
})
//user should see all the user cards except
//0. his own card
//1. his connections
//2. ignored people
//3. already sent the connections request
userRouter.get("/feed",userAuth,async(req,res)=>{
 try{
 //find all connection request(sent+received)
  const loggedUser=req.user;
  const page=parseInt(req.query.page)||1
  let limit=parseInt(req.query.limit)||10
  limit=limit>50?50:limit;
  const skip=(page-1)*limit
  const connection=await connectionRequest.find({
    $or:
    [
        {fromUserId:loggedUser._id},
        {toUserId:loggedUser._id}
    ]
  })
  .select("fromUserId toUserId");  
  const hideUserFromFeed=new Set()
  connection.forEach((req)=>{
    hideUserFromFeed.add(req.fromUserId.toString())
    hideUserFromFeed.add(req.toUserId.toString())
  })  
  const users = await User.find({
    $and:
    [
    {_id:{$nin:Array.from(hideUserFromFeed)}}, // Exclude users in hideUserFromFeed
    {_id:{$ne:loggedUser._id}} //Exclude the logged-in user
    ]
  })
  .select(USER_SAFE_DATA).skip(skip).limit(limit)
  res.send(users)
 }
 catch(err)
 {
  res.status(400).json({message:err.message})
 } 
})

module.exports=userRouter;