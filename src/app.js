//create server
const express=require("express");
const connectDB=require("./config/database")
const app=express();
const User=require('./models/user')

app.use(express.json());

app.post("/signup",async (req,res)=>{
  const user=new User(req.body)
  try{
    await user.save();
    res.send("user added succesfully");
  }catch(err)
  {
    res.status(400).send("error saving the data")
  }
});

app.get("/user",async(req,res)=>{
     const toemail=req.body.email;
     const useremail=await User.find({email:toemail})
     res.send(useremail)
})

connectDB()
.then(()=>{
console.log("Database connection established..");
app.listen(3000,()=>{
  console.log("server is sucessfully on port 3000");
})
}).catch((err)=>{
console.log("Database cannot be connected");
})





