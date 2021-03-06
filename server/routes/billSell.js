const express = require("express");
const asyncHandler = require('express-async-handler')
const router = express.Router();
const {getBillWithId,getListBillWithStatus,getListBillSellWithLimit,getBillWithIdBuyer,getBillWithIdBuyerAndType,getListBillSell,create,updateStatus,update,remove} =require("../services/billSell");
const {checkSignup} =require("../middlewares/checkUser");
const {checkAuth,checkAdmin} =require("../middlewares/auth");


//POST GET LIST BILL SELL
router.post("/",checkAuth,checkAdmin,asyncHandler(getListBillSell))

//POST GET BILL SELL WITH ID  
router.post("/get/:id",checkAuth,checkAdmin,asyncHandler(getBillWithId))

//POST GET BILL SELL WITH STATUS 
router.post("/history/status",checkAuth,checkAdmin,asyncHandler(getListBillWithStatus))

router.post("/history/limit",checkAuth,checkAdmin,asyncHandler(getListBillSellWithLimit))

router.post("/history/bill/:id",checkAuth,checkAdmin,asyncHandler(getBillWithIdBuyer))

router.post("/history/bill/:id/debt",checkAuth,checkAdmin,asyncHandler(getBillWithIdBuyerAndType))

//POST CREATE BILL SELL
router.post("/create",checkAuth,checkAdmin, asyncHandler(create))

//PUT UPDATE BILL SELL
router.put("/:id",checkAuth,checkAdmin,asyncHandler(update))

//PUT UPDATE BILL SELL
router.put("/status/:id",checkAuth,checkAdmin,asyncHandler(updateStatus))

//DELETE  BILL SELL
router.delete("/:id",checkAuth,checkAdmin,asyncHandler(remove))


module.exports = router;