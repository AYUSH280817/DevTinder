const mongoose=require("mongoose")
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://ayushsingh28082001:AYUSHsingh28@namastenode.diuto.mongodb.net/DevTinder")
}
module.exports=connectDB;






