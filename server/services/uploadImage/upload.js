const multer=require("multer");
const path=require("path");
const {checkFileType} = require("./checkDir")

const storageProduct = multer.diskStorage({
    destination: path.join(__dirname,"../../public/uploads/products"),
    filename: function(req, file, cb) {
        cb(null, "upload" + path.extname(file.originalname))
    }
})

const uploadProduct= multer({
    storage: storageProduct,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('file')

module.exports={
    uploadProduct
};
