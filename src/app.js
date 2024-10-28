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
//find a data 
app.get("/user",async(req,res)=>{
  const useremail=req.body.email;
  const emailfind=await User.find({email:useremail})
  if(emailfind.length===0)
  {
    res.status(404).send("did noot find")

  }
  else{
    res.send(emailfind)
  } 
})
//find all data
app.get('/feed',async(req,res)=>{
const userf=await User.find({});
res.send(userf);
})
//delete the data from database
app.delete('/user', async (req, res) => {
  const userId = req.body._id;

  try {
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return res.status(404).send("User not found, deletion failed");
    }

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send(`Error deleting user: ${err.message}`);
  }
});
//update 
app.patch("/user",async(req,res)=>{
  const userid=req.body.userid;
  const data=req.body;
  try{
    const updateuser=await User.findByIdAndUpdate(userid,data,{
      returnDocument:"after",
      runValidators:true
    });
    res.send("update hogaya hai"+updateuser);

  }
  catch(err)
  {
    res.status(404).send("erroe hai"+err.message)
  }
 
})

connectDB()
.then(()=>{
console.log("Database connection established..");
app.listen(3001,()=>{
  console.log("server is sucessfully on port 7777");
})
}).catch((err)=>{
console.log("Database cannot be connected");
})


