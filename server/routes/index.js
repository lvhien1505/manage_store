const express = require("express");
const asyncHandler = require('express-async-handler')
const router = express.Router();
const {signup,login} =require("../services/user");
const {checkSignup} =require("../middlewares/checkUser");
const {checkAuth,checkAdmin} =require("../middlewares/auth");



router.post("/signup",checkSignup,asyncHandler(signup))

router.post("/login", asyncHandler(login))

router.post("/check-auth",checkAuth,checkAdmin,(req,res)=>{
    return res.status(200).json(req.user)
})

 

module.exports = router;