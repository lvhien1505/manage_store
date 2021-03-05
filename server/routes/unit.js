const express = require("express");
const asyncHandler = require('express-async-handler')
const router = express.Router();
const {getListUnit,getUnitWithId,create,update,remove} =require("../services/unit");
const {checkAuth,checkAdmin} =require("../middlewares/auth");


//POST GET LIST UNIT
router.post("/",checkAuth,checkAdmin,asyncHandler(getListUnit))

//POST GET UNIT WITH ID
router.post("/get/:id",checkAuth,checkAdmin,asyncHandler(getUnitWithId))

//POST CREATE UNIT
router.post("/create",checkAuth,checkAdmin, asyncHandler(create))

//PUT UPDATE UNIT
router.put("/:id",checkAuth,checkAdmin,asyncHandler(update))

//DELETE  UNIT
router.delete("/:id",checkAuth,checkAdmin,asyncHandler(remove))


module.exports = router;