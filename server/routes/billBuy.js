const express = require("express");
const asyncHandler = require('express-async-handler')
const router = express.Router();
const {getBillWithId,getListBillBuyWithLimit,getListBillWithStatus,getListBillBuy,create,update,updateStatus,remove} =require("../services/billBuy");
const {checkSignup} =require("../middlewares/checkUser");
const {checkAuth,checkAdmin} =require("../middlewares/auth");


//POST GET LIST BILL BUY
router.post("/",checkAuth,checkAdmin,asyncHandler(getListBillBuy))

//POST GET BILL BUY WITH ID  
router.post("/get/:id",checkAuth,checkAdmin,asyncHandler(getBillWithId))

//POST GET BILL SELL WITH STATUS 
router.post("/history/status",checkAuth,checkAdmin,asyncHandler(getListBillWithStatus))

router.post("/history/limit",checkAuth,checkAdmin,asyncHandler(getListBillBuyWithLimit))

//POST CREATE BILL BUY
router.post("/create",checkAuth,checkAdmin, asyncHandler(create))

//PUT UPDATE BILL BUY
router.put("/:id",checkAuth,checkAdmin,asyncHandler(update))

//PUT UPDATE BILL BUY
router.put("/status/:id",checkAuth,checkAdmin,asyncHandler(updateStatus))

//DELETE  BILL BUY
router.delete("/:id",checkAuth,checkAdmin,asyncHandler(remove))


module.exports = router;