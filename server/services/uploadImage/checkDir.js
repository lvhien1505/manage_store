const fs=require("fs");
const path=require("path");

const dir={
    urlIndex:"public/uploads",
    urlProduct:"public/uploads/products"
}

const checkDir=()=>{
    const dirIndex=path.join(__dirname,`../../${dir.urlIndex}`)
    const dirProduct=path.join(__dirname,`../../${dir.urlProduct}`)
    if (!fs.existsSync(dirIndex)) {
        fs.mkdirSync(dirIndex,{ recursive: true });
      }
    if (!fs.existsSync(dirProduct)) {
        fs.mkdirSync(dirProduct,{ recursive: true });
    }
    return;
};

const checkFileType=(file, cb) =>{
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype)
  
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Image Only!')
    }
}
  
const clearImageOld=(path,file)=>{
    if (file) {
     return fs.unlinkSync(`${path}/${file}`);
    }
}

const reNameImage=(id)=>{
    var url="";
    var fileOld=""
    var status=false;
    var count=0;
    const dirProduct=path.join(__dirname,`../../${dir.urlProduct}`)
    const files=fs.readdirSync(dirProduct);
    files.forEach((file)=>{
      if (file.split(".")[0]===id) {
        fileOld=file;
      }
      if (file.split(".")[0]==="upload") {
        let changeUrl=`${dirProduct}/${id}.${file.split(".")[1]}`;
        fs.renameSync(`${dirProduct}/${file}`,changeUrl)
        count=0;
      }else{
        count++;
      }
      if (count===0) {
        status=true;
        url=`public/uploads/products/${id}.${file.split(".")[1]}`;
        return;
      }
    })
    if (status) {
      clearImageOld(dirProduct,fileOld);
    }
    return url;
  }
  
module.exports= {
    checkDir,
    checkFileType,
    reNameImage,
};
  
