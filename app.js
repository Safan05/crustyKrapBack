const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const helmet=require("helmet");
const cookieParser=require("cookie-parser");
const menu=require("./routes/Menu");
const admin=require("./routes/Admin");
const path = require('path');
const userRouter=require("./routes/user");
require('dotenv').config();
const mongolink = process.env.MONGODB;
process.on("uncaughtException",(exception)=>{console.log("Exception !")});  // used to handle any sync exception that may happen
process.on("unhandledRejection",(exception)=>{console.log("Rejection !")});  // used to handle any asyn rejection that may happen
app.use(cors({
    origin: 'http://localhost:3000',  // Frontend running on localhost:3000
    credentials: true,                // Allow cookies or authorization headers
  }));
app.use(express.static(path.join(__dirname, 'build')));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/api/menu",menu);
app.get("/",(req,res)=>{
    res.send("Hi !");
})
app.use("/user/admin",admin)
app.use("/user",userRouter)
app.get("/cookies",(req,res)=>{
    res.send(cookieParser.JSONCookies(req.cookies));
})
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'));
})
mongoose.connect(mongolink).then(()=>console.log("Database connected...")).catch((err)=>console.log(err));
const port = process.env.port||3000;
app.listen(port,()=>{console.log(`listening to port ${port}`)});