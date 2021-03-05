const {uploadProduct} = require("./upload");
const path = require('path')
const {UPLOAD_FAILED,NO_FILE_SELECT} =require("../../utils/notify")

const createImageProduct=(req,res)=>{
    return uploadProduct(req,res,async (err)=>{
     if (err) res.status(500).json(UPLOAD_FAILED);
     if (req.file === undefined) res.status(400).json(NO_FILE_SELECT);
     return res.status(200).json({
         error: false,
         name: req.file.filename,
         message: "File uploaded!",
         status: "done",
         url: path.join(__dirname, '../../public/uploads/products', req.file.filename)
    })
 })
}

module.exports = {
    createImageProduct
};