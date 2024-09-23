const mongoose=require("mongoose");
const valid=require("validator");
const config=require("config");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const jwtSecret = process.env.JWTSECVAR;
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:(val)=>{return valid.isEmail(val)},
            message:"{VALUE}  is not valid"
        }
    },
    isAdmin:{
        type:Boolean,
        required:true
    }
})
schema.method("CreateToken",function(){
if(!jwtSecret)
    return -1;
const token=jwt.sign({_id:this._id,Admin:this.isAdmin},jwtSecret);
return token;
})
module.exports=mongoose.model("Users",schema)