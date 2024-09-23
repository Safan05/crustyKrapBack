const express=require("express");
const router=express.Router();
const controller=require("../controllers/Admin");
const authorize=require("../middlewares/authorization");
router.delete("/",authorize,controller.deleteData);
router.post("/",authorize,controller.addData);
router.get("/",(req,res)=>{
    //console.log(req.cookies)
    const user={
        name:req.cookies.name,
        isAdmin:req.cookies.isAdmin
    }
    res.json(user);
})
module.exports=router