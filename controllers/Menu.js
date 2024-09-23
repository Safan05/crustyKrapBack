const data=require("../models/MenuData");
const getMenu = async (req,res)=>{
    let obj=[];
    obj=await data.find({}).select("-_id");
   // console.log(obj);
    res.json(obj);
}

module.exports={getMenu}