 //creating server 
 const express=require("express")
 const app=express();
 app.use("/list",(req,res)=>{
    res.send("JAI SHREE RAM ")
 })
 app.listen(3000,()=>{
    console.log("hello server");
 })