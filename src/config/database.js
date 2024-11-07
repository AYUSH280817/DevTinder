const mongoose =require('mongoose')
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://ayushsingh28082001:j4hul39FiZzCxDLV@devtinderproject.ulpt2.mongodb.net/?retryWrites=true&w=majority&appName=DEVTINDERPROJECT")
}
module.exports=connectDB



