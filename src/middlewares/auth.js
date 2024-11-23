const jwt=require("jsonwebtoken");
const User=require("../models/user");
const userAuth=async(req,res,next)=>{
  try{
    const {token}=req.cookies;
    if(!token)
    {
      throw new Error("Token is not valid");
    }
    const decodedMessage=await jwt.verify(token,"DEVTINDER@28");
    const {_id}=decodedMessage;
    const user=await User.findOne({_id:_id});
    if(!user)
    {
      throw new Error("User is not valid");
    }
    req. user=user;
    next()
  }
  catch(err){
    res.status(400).send("Error"+err.message);
    throw new error("Invaild");  
  }
}
module.exports=userAuth