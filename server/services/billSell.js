const BillSellModel = require("../models/billSell");
const BuyerModel = require("../models/buyer");
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

const getListBillSellWithLimit = async (req, res) => {
  try {
    let listBill = await BillSellModel.find({status:true})
      .limit(15)
      .sort({ createdAt: "desc" });
    res.status(200).json(listBill);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getListBillWithStatus = async (req, res) => {
  try {
    let status = req.body.status;
    let listBill = await BillSellModel.find({ status: status });
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

const updateStatus = async (req, res) => {
  try {
    let id = req.params.id;
    if (id) {
      let data = await BillSellModel.findByIdAndUpdate({ _id: id }, {status:true});
      if (data) {
        return res.status(200).json(UPDATE_BILL_SELL_SUCCESS);
      }
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const create = async (req, res) => {
  let buyer ="";
  try {
    let buyerId = req.body.buyerId;
    let buyerCode = req.body.buyerCode;
    let nameBuyer = req.body.nameBuyer;
    let phone = req.body.phone;
    let createdHour = req.body.createdHour;
    let createdDay = req.body.createdDay;
    let userCreate = req.body.userCreate;
    let userSell = req.body.userSell;
    let listSell = req.body.listSell;
    let countNumSell = req.body.countNumSell;
    let totalMoneySell = req.body.totalMoneySell;
    let totalSaleOffMoneySell = req.body.totalSaleOffMoneySell;
    let totalBuyerPaidNeed = req.body.totalBuyerPaidNeed;
    let totalBuyerPaid = req.body.totalBuyerPaid;
    let totalExcessPaid = req.body.totalExcessPaid;
    let noteSell = req.body.noteSell;
    let status = req.body.status;
    let bill = {
      buyerId,
      buyerCode,
      nameBuyer,
      phone,
      createdHour,
      createdDay,
      userCreate,
      userSell,
      listSell,
      countNumSell,
      totalMoneySell,
      totalSaleOffMoneySell,
      totalBuyerPaidNeed,
      totalBuyerPaid,
      totalExcessPaid,
      noteSell,
      status,
    };
    if (buyerId) {
      buyer = await BuyerModel.findById(buyerId);
    }
    let data = await BillSellModel.create(bill);
    if (data) {
      if (buyer) {
        let totalSell = buyer.totalSell;
        let newTotalSell = totalSell + data.totalBuyerPaidNeed;
        if (totalExcessPaid < 0) {
          let newDebt = parseInt(buyer.debt) + -totalExcessPaid;
          await BuyerModel.findByIdAndUpdate(
            { _id: buyerId },
            { debt: newDebt, totalSell: newTotalSell }
          );
        }
        await BuyerModel.findByIdAndUpdate(
          { _id: buyerId },
          { totalSell: newTotalSell }
        );
      }
      return res.status(200).json(CREATE_BILL_SELL_SUCCESS);
    }
  } catch (error) {
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
  getListBillSellWithLimit,
  getBillWithId,
  getListBillWithStatus,
  updateStatus
};
