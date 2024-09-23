const data=require("../models/MenuData");
const deleteData=async (req,res)=>{
    try{
    const deleted=await data.find({id:req.query.id});
    if(deleted){
       // console.log(deleted);
        data.deleteOne({id:req.query.id}).then(()=>res.sendStatus(200)).catch((err)=>{console.log(err); res.sendStatus(500)});
    }
    else{
        console.log("The requested is not found");
        res.status(500).send("500 Internal error")
    }
}
catch(err){
    console.log("error 500");
res.status(500).send("500 Internal Server Error");
}
}

const addData=async (req,res)=>{
    try{
    console.log("posting...");
    const d=await data.find().sort({"id":-1}).limit(1)
    console.log(d[0].id);
    const id=d[0].id+1;
    const item={
        name:req.body.name,
        price:req.body.price,
        id:id,
        count:0,
        added:false
    }
    await data.create(item);
    res.send("Done item added !");
}
catch(err){
    console.log(err);
    res.status(300).send("Dublicated item");
}
}
module.exports={deleteData,addData};