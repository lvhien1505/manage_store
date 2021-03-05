const express = require("express");
const asyncHandler = require('express-async-handler')
const router = express.Router();
const {getListProducts,getProductWithId,create,update,remove,uploadImage} =require("../services/product");
const {checkSignup} =require("../middlewares/checkUser");
const {checkAuth,checkAdmin} =require("../middlewares/auth");


//POST GET LIST PRODUCT
router.post("/",checkAuth,checkAdmin,asyncHandler(getListProducts))

//POST GET PRODUCT WITH ID  
router.post("/get/:id",checkAuth,checkAdmin,asyncHandler(getProductWithId))

//POST CREATE PRODUCT
router.post("/create",checkAuth,checkAdmin, asyncHandler(create))

//PUT UPDATE PRODUCT
router.put("/:id",checkAuth,checkAdmin,asyncHandler(update))

//DELETE  PRODUCT
router.delete("/:id",checkAuth,checkAdmin,asyncHandler(remove))

router.post("/upload/image",checkAuth,checkAdmin,asyncHandler(uploadImage))


module.exports = router;