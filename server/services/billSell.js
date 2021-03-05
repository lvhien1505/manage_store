const BillSellModel = require("../models/billSell");
const {
  ERROR_SERVER,
  CREATE_BILL_SELL_SUCCESS,
  UPDATE_BILL_SELL_SUCCESS,
  DELETE_BILL_SELL_SUCCESS,
} = require("../utils/notify");

const getListBillSell = async (req, res) => {
  try {
    let listBill = await BillSellModel.find();
    res.status(200).json(listBill);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getBillWithId = async (req, res) => {
  try {
    let bill = await BillSellModel.findById(req.params.id);
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const create = async (req, res) => {
  try {
      let buyerId=req.body.buyerId;
      let code="0001";
      let key="0001";
      let nameBuyer =req.body.nameBuyer;
      let phone = req.body.phone;
      let createdHour = req.body.createdHour;
      let createdDay = req.body.createdDay;
      let userCreate = req.body.userCreate;
      let userSell = req.body.userSell;
      let listSell =req.body.listSell;
      let countNumSell=req.body.countNumSell;
      let totalMoneySell=req.body.totalMoneySell;
      let totalSaleOffMoneySell=req.body.totalSaleOffMoneySell;
      let totalBuyerPaidNeed=req.body.totalBuyerPaidNeed;
      let totalBuyerPaid=req.body.totalBuyerPaidBuyer;
      let totalExcessPaid=req.body.totalExcessPaid;
      let noteSell =req.body.noteSell;
    let bill={buyerId,nameBuyer,phone,createdHour,createdDay,userCreate,userSell,listSell,countNumSell,totalMoneySell,totalSaleOffMoneySell,totalBuyerPaidNeed,totalBuyerPaid,totalExcessPaid,noteSell,code,key}
    let data = await BillSellModel.create(bill);
    if (data) {
      return res.status(200).json(CREATE_BILL_SELL_SUCCESS);
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(ERROR_SERVER);
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let bill = {};
    if (req.body.error) {
      bill.error = req.body.error;
    }
    let data = await BillSellModel.findByIdAndUpdate({ _id: id }, bill);
    if (data) {
      return res.status(200).json(UPDATE_BILL_SELL_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const remove = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await BillSellModel.findByIdAndDelete({ _id: id });
    if (data) {
      return res.status(200).json(DELETE_BILL_SELL_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

module.exports = {
  create,
  update,
  remove,
  getListBillSell,
  getBillWithId
};
