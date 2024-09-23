const users = require("../models/Users");
const bcrypt = require("bcrypt");  
const register=async (req,res)=>{
    try{
    let user=await users.findOne({email:req.body.email}).exec();
    if(user)
        return res.status(300).send("Dublicated accounted ... Bad Request");
    let salt=await bcrypt.genSalt(10);
    console.log("doing...");
    let hashedpass=await bcrypt.hash(req.body.password,salt);
    user=new users({
        name:req.body.name,
        email:req.body.email,
        password:hashedpass,
        isAdmin:false
    }) 
    user.save().then(()=>{
        const token=user.CreateToken();
        if(token==-1)
           return res.status(500).send("Internal Server error !");
        console.log("What");
        res.cookie("token",token,{httpOnly:true,expires:null,  sameSite: 'None',   secure: true,      // Required for `SameSite=None` cookies
            // Allows the cookie to be sent in all cross-site contexts
        });
        res.header("x-authentication-token",token);
        res.status(200).send("User Registered Successfully");
    }).catch((err)=>console.log(err))
}
catch(err){
    console.log(err);
}
    }
module.exports={register}