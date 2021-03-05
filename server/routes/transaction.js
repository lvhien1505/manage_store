const express = require("express");
const asyncHandler = require('express-async-handler')
const router = express.Router();
const {getListTransaction,create,update,remove} =require("../services/transaction");
const {checkSignup} =require("../middlewares/checkUser");
const {checkAuth,checkAdmin} =require("../middlewares/auth");


//POST GET LIST BUYER
router.post("/",checkAuth,checkAdmin,asyncHandler(getListTransaction))

//POST CREATE BUYER
router.post("/create",checkAuth,checkAdmin, asyncHandler(create))

//PUT UPDATE BUYER
router.put("/:id",checkAuth,checkAdmin,asyncHandler(update))

//DELETE  BUYER
router.delete("/:id",checkAuth,checkAdmin,asyncHandler(remove))


module.exports = router;