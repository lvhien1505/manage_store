const TransactionModel = require("../models/transaction");
const {getTime} =require("../utils/time")
const {
  ERROR_SERVER,
  CREATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_SUCCESS
} = require("../utils/notify");


const getListTransaction = async (req, res) => {
  try {
    let listTransaction = await TransactionModel.find().populate("products");
    res.status(200).json(listTransaction);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const create = async (req, res) => {
  try {
    let code = req.body.code || "";
    let buyer = req.body.buyer || "";
    let dayTransaction = getTime() || "";
    let totalMoney = req.body.totalMoney || "";
    let debtMoney = req.body.debtMoney || "";
    let paidMoney = req.body.paidMoney || "";

    let transaction = {
      code,
      buyer,
      dayTransaction,
      totalMoney,
      debtMoney,
      paidMoney
    };
    let data = await TransactionModel.create(transaction);
    if (data) {
      return res.status(200).json(CREATE_TRANSACTION_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let transaction = {};
    if (req.body.buyer) {
      transaction.buyer = req.body.buyer;
    }
    if (req.body.totalMoney) {
      transaction.totalMoney = req.body.totalMoney;
    }
    if (req.body.debtMoney) {
      transaction.debtMoney = req.body.debtMoney;
    }
    if (req.body.paidMoney) {
      transaction.paidMoney = req.body.paidMoney;
    }
    let data = await TransactionModel.findByIdAndUpdate({ _id: id }, transaction);
    if (data) {
      return res.status(200).json(UPDATE_TRANSACTION_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const remove = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await TransactionModel.findByIdAndDelete({ _id: id });
    if (data) {
      return res.status(200).json(DELETE_TRANSACTION_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

module.exports = {
  create,
  update,
  remove,
  getListTransaction
};
