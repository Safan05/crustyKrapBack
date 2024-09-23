const mongoose=require("mongoose");
const valid=require("validator");
const config=require("config");
const jwt = require("jsonwebtoken");
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
if(!config.get("jwtsec"))
    return -1;
const token=jwt.sign({_id:this._id,Admin:this.isAdmin},config.get("jwtsec"));
return token;
})
module.exports=mongoose.model("Users",schema)