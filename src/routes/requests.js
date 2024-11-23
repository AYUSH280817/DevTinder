const express=require("express")
const requestRouter=express.Router()
const userAuth=require("../middlewares/auth")
const connectionRequest=require("../models/connectionRequest")
const User=require("../models/user")
requestRouter.post("/request/send/:status/:toUserId",
    userAuth,
    async(req,res)=>{   
     try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
        const allowedStatus=["ignored","interested"];

        if(!allowedStatus.includes(status)){
        return res
              .status(400)
              .json({message:"invalid status type"})
        }
        
        //toUserId present in database or not
         const toUser=await User.findOne({toUserId});
         if(!toUser)
         {
            return res.status(484).json({
                message:"user in not in database"
            })
         }
         
         //if connection made before or not
          const existingConnectionrequest=await connectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ]
          })
          if(existingConnectionrequest){
            return res
                   .status(400)
                   .json({message:"Connection already exist" });
          }

        const connection=new connectionRequest({
            fromUserId,
            toUserId,
            status,
        })
        const data= await connection.save();
        res.json(
        {
            message:"connection has been made",
            data,
        }
        )
     }
     catch(err){
        res.send("err hai "+err.message)
     }
})
module.exports=requestRouter; 