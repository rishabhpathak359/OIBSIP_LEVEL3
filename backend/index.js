const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv").config()
const app=express();
const {mongoose} =require("mongoose");
const corsOptions = {
    origin: ['http://localhost:5173' , 'https://oibsip-level-3.vercel.app' ,'https://pizzeria-gilt.vercel.app'],
    credentials: true,
  };
  
  app.use(cors(corsOptions)); 
 mongoose.connect(process.env.MONGO_URL)
 .then(()=> console.log("DB connected"))
 .catch((err)=> console.log("DB Error" , err));
 app.use(express.json())
app.get("/" , (req,res)=>{
  res.send("Hello")
})
app.use("/" ,require("./routes/authRoutes"));
 
app.listen("3000",()=>console.log("Server is listening on Port no. 3000"))  