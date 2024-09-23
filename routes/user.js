const express=require("express");
const router=express.Router();
const users=require("../models/Users");
const bcrypt=require("bcrypt");
router.post("/login",async (req,res)=>{
    try{
    res.cookie("name","",{httpOnly:true,expires:null});
    res.cookie("isAdmin",false,{httpOnly:true,expires:null});
    let user=await users.findOne({email:req.body.email}).exec();
    if(!user)
        return res.status(300).send("Account not found ... bad request");
    let validPass=await bcrypt.compare(req.body.password,user.password);
    if(!validPass)
        return res.status(300).send("Wrong Password");
    const token=user.CreateToken();
    console.log("What is happening");
    //console.log(token);
    if(token==-1)
        return res.status(500).send("Internal error , will be solved soon !");
    console.log("Hi");
    res.cookie("name",user.name,{httpOnly:true,expires:null});
    res.cookie("isAdmin",user.isAdmin,{httpOnly:true,expires:null});
    res.header("x-authentication-token",token);
    res.header('Access-Control-Expose-Headers', 'Authorization, x-authentication-token'); // Expose custom headers
    res.status(200).send("User SignedIn Successfully");
}
catch(err){
    console.log(err);
    res.status(500).send("Internal Error")
}
})
const controller=require("../controllers/Users");        
router.post("/",controller.register);
module.exports=router;