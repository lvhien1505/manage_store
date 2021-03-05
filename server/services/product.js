const ProductModel = require("../models/product");
const {checkDir,reNameImage} = require("./uploadImage/checkDir")
const {createImageProduct} = require("./uploadImage")
const {
  ERROR_SERVER,
  CREATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  EXIST_CODE_PRODUCT
} = require("../utils/notify");


const getListProducts = async (req, res) => {
  try {
    let listProducts = await ProductModel.find().populate("category unit");
    res.status(200).json(listProducts);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getProductWithId = async (req, res) => {
  try {
    let product = await ProductModel.findById(req.params.id).populate("category unit");
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};


const create = async (req, res) => {
  try {
    let code = req.body.code || "";
    let key = req.body.code || "";
    let name = req.body.name || "";
    let category = req.body.category || "";
    let unit = req.body.unit || "";
    let moneyIn = req.body.moneyIn || "";
    let moneyOut = req.body.moneyOut || "";
    let inventory = req.body.inventory || "";

    let product = {
      code,
      key,
      name,
      category,
      moneyIn,
      moneyOut,
      inventory,
      unit
    };
    let existProduct =await ProductModel.findOne({code:code});
    if (existProduct) {
      return res.status(400).json(EXIST_CODE_PRODUCT)
    }
    let data = await ProductModel.create(product);
    if (data) {
      let image = reNameImage(data._id);
      if (image) {
        await ProductModel.findByIdAndUpdate({ _id: data._id }, { image: image });
      }
      return res.status(200).json(CREATE_PRODUCT_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let image = reNameImage(id);
    let product = {};
    if (req.body.name) {
      product.name = req.body.name;
    }
    if (req.body.category) {
      product.category = req.body.category;
    }
    if (req.body.unit) {
      product.unit = req.body.unit;
    }
    if (req.body.moneyIn) {
      product.moneyIn = req.body.moneyIn;
    }
    if (req.body.moneyOut) {
      product.moneyOut = req.body.moneyOut;
    }
    if (req.body.inventory) {
      product.inventory = req.body.inventory;
    }
    if (image) {
      product.image = image;
    }

    let data = await ProductModel.findByIdAndUpdate({ _id: id }, product);
    if (data) {
      return res.status(200).json(UPDATE_PRODUCT_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const remove = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await ProductModel.findByIdAndDelete({ _id: id });
    if (data) {
      return res.status(200).json(DELETE_PRODUCT_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const uploadImage = (req,res)=>{
    checkDir();
    createImageProduct(req, res);
}


module.exports = {
  create,
  update,
  remove,
  getListProducts,
  uploadImage,
  getProductWithId
};
