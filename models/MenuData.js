const mongoose=require("mongoose");
// string name - int id - int count - int price - bool added
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    id:{
        type:Number,
        unique:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    count:{
        type:Number,
    },
    added:{
        type:Boolean
    }
})
module.exports=mongoose.model("Menu",schema);