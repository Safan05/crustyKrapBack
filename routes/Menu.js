const express=require("express");
const router=express.Router();
const controller=require("../controllers/Menu");
router.get("/",controller.getMenu);
module.exports=router