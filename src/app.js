 //creating server 
 const express=require("express")
 const {adminAuth}=require("./middlewares/auth.js")
 const app=express();
 app.use("/admin",adminAuth)
 app.get("/admin/getAllData",(req,res)=>{
   res.send({firstName:"Ayush",lastName:"Singh"});
 })
 app.listen(3000,()=>{
    console.log("hello server");
 })