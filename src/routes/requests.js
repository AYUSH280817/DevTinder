const express=require("express")
const requestRouter=express.Router()
const userAuth=require("../middlewares/auth")
const connectionRequest=require("../models/connectionRequest")
const User=require("../models/user")
const mongoose = require("mongoose");
requestRouter.post("/request/send/:status/:toUserId",
    userAuth,
    async (req, res) => {   
     try {
        console.log("Request received:", req.params, req.user);

        const fromUserId = req.user._id; 
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        // Validate status
        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            console.log("Invalid status:", status);
            return res.status(400).json({ message: "Invalid status type" });
        }

        // Check if the user exists
        const toUser = await User.findOne({ _id: toUserId });
        if (!toUser) {
            console.log("User not found in database:", toUserId);
            return res.status(404).json({ message: "User is not in the database" });
        }

        // Check if connection already exists
        const existingConnectionRequest = await connectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });
        if (existingConnectionRequest) {
            console.log("Connection already exists between:", fromUserId, toUserId);
            return res.status(400).json({ message: "Connection already exists" });
        }

        // Restrict multiple requests to the same user
        const existingRequest = await connectionRequest.findOne({
            fromUserId,
            toUserId,
        });
        if (existingRequest) {
            console.log("Pending request already exists for:", fromUserId, toUserId);
            return res.status(400).json({ message: "You already have a pending request to this user" });
        }

        // Create the connection request
        const connection = new connectionRequest({
            fromUserId,
            toUserId,
            status,
        });
        const data = await connection.save();
        console.log("Connection request created successfully:", data);

        res.json({
            message: "Connection has been made",
            data,
        });
     } catch (err) {
        console.error("Error processing request:", err.message, err.stack);
        res.status(500).json({ message: "Server error: " + err.message });
     }
});


requestRouter.post("/request/review/:status/:requestId",
    userAuth,
    async(req,res)=>{
        try{
         const loggedUser=req.user;
         const {status,requestId}=req.params
         const allowedStatus=["accepted","rejected"]
         if(!allowedStatus.includes(status))
        {
            return res.status(400).json({message:"status not allowed"})
        } 
            const connection=await connectionRequest.findOne({
            _id:requestId,
            toUserId:loggedUser._id,
            status:"interested"
         })
         if(!connection)
         {
            return res
            .status(404)
            .json({message:"no requested found"})
         }
         connection.status=status;
        const data= await connection.save();
         res.json({message:"connection request"+status,data})
        }catch(err){
          res.send("Error"+err.message)
        }
    }
)
module.exports=requestRouter
