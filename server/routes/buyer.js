const express = require("express");
const asyncHandler = require('express-async-handler')
const router = express.Router();
const {getListBuyer,getBuyerWithId,create,update,remove} =require("../services/buyer");
const {checkSignup} =require("../middlewares/checkUser");
const {checkAuth,checkAdmin} =require("../middlewares/auth");


//POST GET LIST BUYER
router.post("/",checkAuth,checkAdmin,asyncHandler(getListBuyer))

//POST GET BUYER WITH ID  
router.post("/get/:id",checkAuth,checkAdmin,asyncHandler(getBuyerWithId))

//POST CREATE BUYER
router.post("/create",checkAuth,checkAdmin, asyncHandler(create))

//PUT UPDATE BUYER
router.put("/:id",checkAuth,checkAdmin,asyncHandler(update))

//DELETE  BUYER
router.delete("/:id",checkAuth,checkAdmin,asyncHandler(remove))


module.exports = router;