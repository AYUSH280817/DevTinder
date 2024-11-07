const validator=require("validator")
const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
 firstName:{
    type:String,
    required:true
 },
 lastName:{
    type:String,
    required:true,
 },
 email:{
    type:String,
    required:true,
    trin:true,
    unique:true,
    validate(value)
    {
        if(!validator.isEmail(value))
        {
         throw new Error("invalid email");
        }
    }
 },
 age:{
    type:Number,
    min:18
 },
 gender:{
    type:String,
    validate(value){
     if(!["male","female","other"].includes(value))
     {
        throw new Error("Gender data is not valid");
     }
    }
 },
 password:{
   type:String,
   validate(value)
   {
      if(!validator.isStrongPassword(value))
      {
       throw new Error("Invalid password")
      }
   }
 },
 skills:{
    type:[String],
 }
},{timestamps:true})
const User=mongoose.model("User",userSchema);
module.exports=User;







