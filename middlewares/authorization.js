const auth=(req,res,nxt)=>{
    if(req.cookies.isAdmin===false || req.cookies.isAdmin==='false')
        return res.status(300).send("You're not authorized to do this");
    else
    nxt();
}
module.exports=auth