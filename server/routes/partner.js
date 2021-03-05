const express = require("express");
const asyncHandler = require('express-async-handler')
const router = express.Router();
const {getListPartner,create,update,remove} =require("../services/partner");
const {checkSignup} =require("../middlewares/checkUser");
const {checkAuth,checkAdmin} =require("../middlewares/auth");


//POST GET LIST PARTNER
router.post("/",checkAuth,checkAdmin,asyncHandler(getListPartner))

//POST CREATE PARTNER
router.post("/create",checkAuth,checkAdmin, asyncHandler(create))

//PUT UPDATE PARTNER
router.put("/:id",checkAuth,checkAdmin,asyncHandler(update))

//DELETE  PARTNER
router.delete("/:id",checkAuth,checkAdmin,asyncHandler(remove))


module.exports = router;