const BuyerModel = require("../models/buyer");
const {
  ERROR_SERVER,
  CREATE_BUYER_SUCCESS,
  UPDATE_BUYER_SUCCESS,
  DELETE_BUYER_SUCCESS,
  EXIST_CODE_BUYER,
} = require("../utils/notify");

const getListBuyer = async (req, res) => {
  try {
    let buyers = await BuyerModel.find();
    res.status(200).json(buyers);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getBuyerWithId = async (req, res) => {
  try {
    let buyer = await BuyerModel.findById(req.params.id);
    res.status(200).json(buyer);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const create = async (req, res) => {
  try {
    let code = req.body.code;
    let key = req.body.code;
    let name = req.body.name;
    let age = req.body.age;
    let sex = req.body.sex;
    let phone = req.body.phone;
    let address = req.body.address;
    let note = req.body.note || "";
    let existBuyer = await BuyerModel.findOne({ code: code });
    if (existBuyer) {
      return res.status(400).json(EXIST_CODE_BUYER);
    }
    if (code, key, name, age, sex, phone, address) {
      let buyer = {
        code,
        key,
        sex,
        name,
        age,
        phone,
        address,
        note,
      };
      let data = await BuyerModel.create(buyer);
      if (data) {
        return res.status(200).json(CREATE_BUYER_SUCCESS);
      }
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let buyer = {};
    if (req.body.name) {
      buyer.name = req.body.name;
    }
    if (req.body.age) {
      buyer.age = req.body.age;
    }
    if (req.body.sex) {
      buyer.sex = req.body.sex;
    }
    if (req.body.phone) {
      buyer.address = req.body.phone;
    }
    if (req.body.address) {
      buyer.address = req.body.address;
    }
    if (req.body.note) {
      buyer.note = req.body.note;
    }
    let data = await BuyerModel.findByIdAndUpdate({ _id: id }, buyer);
    if (data) {
      return res.status(200).json(UPDATE_BUYER_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const remove = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await BuyerModel.findByIdAndDelete({ _id: id });
    if (data) {
      return res.status(200).json(DELETE_BUYER_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

module.exports = {
  create,
  update,
  remove,
  getListBuyer,
  getBuyerWithId,
};
