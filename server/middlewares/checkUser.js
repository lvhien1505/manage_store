const UserModel=require("../models/user");
const {USER_EXIST,ERROR_SERVER}=require("../utils/notify")

//check email or username has exist
const checkSignup=async (req,res,next)=>{
    let username=req.body.username;
    let email=req.body.email;
    try {
        let data= await UserModel.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        })
        if (data) {
            return res.status(401).json(USER_EXIST) 
        }
        next();
    } catch (error) {
        res.status(500).json(ERROR_SERVER);
    }
  
}

module.exports={
    checkSignup
}