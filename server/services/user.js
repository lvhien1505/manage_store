const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const UserModel = require("../models/user");
const { ERROR_SERVER,SIGNUP_SUCCESS,ERROR_TOKEN,USER_NOTEXIST,LOGIN_SUCCESS, ERROR_PASSWORD} = require("../utils/notify");

//signup 
const signup = async (req, res) => {
  try {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let user = {
      username,
      password,
      email,
      name
    };
    let data = await UserModel.create(user);
    if (data) {
        return res.status(200).json(SIGNUP_SUCCESS)
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

//login
const login=async (req,res)=>{
    try {
        let username = req.body.username;
        let password = req.body.password;
        let user=await UserModel.findOne({
            username:username
        })
        if (user) {
          let result=await bcrypt.compare(password,user.password);
          if (result) {
            let token =jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: 15 * 60 * 1000 });
            // res.cookie("__t",token,{maxAge:"90000000"});
            return res.status(200).json({token:token});
          }
        }
        res.status(401).json(USER_NOTEXIST)
      } catch (error) {
        res.status(500).json(ERROR_SERVER);
      }
} 

module.exports = {
  signup,
  login
};
