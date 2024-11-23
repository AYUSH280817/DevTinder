const mongoose=require('mongoose')
const connectionRequestSchema=mongoose.Schema({
 fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
 },
 toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
 },
 status:{
    type:String,
    required:true,
    enum:{
        values:["ignore","interested","accepted","rejected"],
        message:`{VALUE} is incorrect status type`
    }
 }
},{timestamps:true})


connectionRequestSchema.index({fromUserId:1,toUserId:1});

//middleware   
connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equal(connectionRequest.toUserId))
    {
        throw new Error("cannot send connection request to yourself")
    }
    next();
})

const connectionRequest=new mongoose.model("connectionRequest",connectionRequestSchema);
module.exports=connectionRequest;