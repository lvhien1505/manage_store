const BillBuyModel = require("../models/billBuy");
const PartnerModel = require("../models/partner");
const {
  ERROR_SERVER,
  CREATE_BILL_SELL_SUCCESS,
  UPDATE_BILL_SELL_SUCCESS,
  DELETE_BILL_SELL_SUCCESS,
} = require("../utils/notify");

const getListBillBuy = async (req, res) => {
  try {
    let listBill = await BillBuyModel.find();
    res.status(200).json(listBill);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getListBillBuyWithLimit = async (req, res) => {
  try {
    let listBill = await BillBuyModel.find().limit(15).sort({createdAt: 'desc'});
    res.status(200).json(listBill);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};



const getBillWithId = async (req, res) => {
  try {
    let bill = await BillBuyModel.findById(req.params.id);
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getListBillWithStatus = async (req, res) => {
  try {
    let status = req.body.status;
    let listBill = await BillBuyModel.find({ status: status });
    res.status(200).json(listBill);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const create = async (req, res) => {
  try {
    let partnerId = req.body.partnerId;
    let partnerCode=req.body.partnerCode;
    let code = `00001`;
    let key = `00001`;
    let namePartner = req.body.namePartner;
    let phone = req.body.phone;
    let createdHour = req.body.createdHour;
    let createdDay = req.body.createdDay;
    let userCreate = req.body.userCreate;
    let userSell = req.body.userSell;
    let listBuy = req.body.listBuy;
    let countNumBuy = req.body.countNumBuy;
    let totalMoneyBuy = req.body.totalMoneyBuy;
    let totalSaleOffMoneyBuy = req.body.totalSaleOffMoneyBuy;
    let totalPaidNeedPartner = req.body.totalPaidNeedPartner;
    let totalMoneyPaid = req.body.totalMoneyPaid;
    let totalDebtMath = req.body.totalDebtMath;
    let noteBuy = req.body.noteBuy;
    let status = req.body.status;
    let bill = {
      partnerId,
      partnerCode,
      namePartner,
      phone,
      createdHour,
      createdDay,
      userCreate,
      userSell,
      listBuy,
      countNumBuy,
      totalMoneyBuy,
      totalSaleOffMoneyBuy,
      totalPaidNeedPartner,
      totalMoneyPaid,
      totalDebtMath,
      noteBuy,
      code,
      key,
      status,
    };
    let partner =await PartnerModel.findById(partnerId)
    let data = await BillBuyModel.create(bill);
    if (data) {
      let totalBuy = partner.totalBuy;
      let newTotalBuy = totalBuy + data.totalPaidNeedPartner;
      if (totalDebtMath<0) {
        let newTotalDebt = parseInt(partner.debt) + (-parseInt(totalDebtMath));
        await PartnerModel.findByIdAndUpdate({_id:partnerId},{debt:newTotalDebt,totalBuy:newTotalBuy})
      }
      await PartnerModel.findByIdAndUpdate({_id:partnerId},{totalBuy:newTotalBuy})
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
    let data = await BillBuyModel.findByIdAndUpdate({ _id: id }, bill);
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
    let data = await BillBuyModel.findByIdAndDelete({ _id: id });
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
  getListBillBuy,
  getBillWithId,
  getListBillWithStatus,
  getListBillBuyWithLimit
};
