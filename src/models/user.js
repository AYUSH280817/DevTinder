
const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    firstName:{
     type:String,
     required:true,
    },
    lastName:{
       type:String,
    },
    email:{
        type:String,
         required:true,
         unique: true,
         trin:true, 
         lowercase:true
    },
    age:{
        type:Number,
        min:18,
    },
     gender:{
        type:String,
        validate(value)
        {
         if(!["Male","Female","other"].includes(value))
         {
            throw new Error("Gender data is not valid")
         }
        },
     },
   
},{
    timestamps:true,
 });
const User=mongoose.model("User",userSchema);
module.exports=User;
