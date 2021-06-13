const BillBuyModel = require("../models/billBuy");
const PartnerModel = require("../models/partner");
const ProductModel = require("../models/product");
const ControlDebtModel = require("../models/controlDebt");
const PaidDebtModel = require("../models/paidDebt");
const {
  ERROR_SERVER,
  CREATE_BILL_SELL_SUCCESS,
  UPDATE_BILL_SELL_SUCCESS,
  DELETE_BILL_SELL_SUCCESS,
} = require("../utils/notify");
const {sortTimeArray} = require("../utils/time")

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
    let listBill = await BillBuyModel.find({ status: true })
      .limit(15)
      .sort({ createdAt: "desc" });
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

const getBillWithIdPartner= async (req, res) => {
  try {
    let partnerId = req.body.partnerId;
    let bill = await BillBuyModel.find({partnerId : partnerId});
    res.status(200).json(bill).sort({ createdAt: "desc" });;
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

// const getBillWithIdPartnerAndType = async (req, res) => {
//   try {
//     let partnerId = req.body.partnerId;
//     let bill = await BillBuyModel.find({ $and:[{partnerId : partnerId},{typeBill:"debt"}]}).sort({ createdAt: "desc" });;
//     res.status(200).json(bill);
//   } catch (error) {
//     res.status(500).json(ERROR_SERVER);
//   }
// };

const getBillWithIdPartnerAndType = async (req, res) => {
  try {
    let partnerId = req.params.id;
    let listBill = await BillBuyModel.find({ $and:[{partnerId : partnerId},{typeBill:"debt"},{status:true}]}).sort({ createdAt: "desc" });
    let listControl = await ControlDebtModel.find({
      idPartner:partnerId,
      typePartner:"partner"
    }).sort({ createdAt: "desc" });
    let listPaidDebt = await PaidDebtModel.find({
      idPartner:partnerId,
      typePartner:"partner"
    }).sort({ createdAt: "desc" });

    let copyListAllBill = [...listBill.concat(listControl).concat(listPaidDebt)]
     let listAllBill = sortTimeArray(copyListAllBill)
    res.status(200).json(listAllBill);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};


const getListBillWithStatus = async (req, res) => {
  try {
    let status = req.body.status;
    let listBill = await BillBuyModel.find({ status: status }).sort({ createdAt: "desc" });
    res.status(200).json(listBill);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const updateStatus = async (req, res) => {
  try {
    let id = req.params.id;
    if (id) {
      let data = await BillBuyModel.findByIdAndUpdate(
        { _id: id },
        { status: true }
      );
      if (data) {
        let idPartner = data.partnerId;

        if (idPartner) {
          let partner = await PartnerModel.findById(idPartner);
          let newTotalBuy = partner.totalBuy + data.totalPaidNeedPartner;
          let newDebt = partner.debt;
          if (data.totalDebtMath < 0) {
            newDebt = partner.debt - parseInt(data.totalDebtMath);
          }
          await PartnerModel.findByIdAndUpdate(
            { _id: idPartner },
            {
              totalBuy: newTotalBuy,
              debt: newDebt,
            }
          );
        }
        return res.status(200).json(UPDATE_BILL_SELL_SUCCESS);
      }
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const create = async (req, res) => {
  let partner = "";
  try {
    let partnerId = req.body.partnerId;
    let partnerCode = req.body.partnerCode;
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

    var typeBill =""

    if (totalDebtMath < 0) {
      typeBill = "debt"
    }else{
      typeBill = "done"
    }

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
      status,
    };
    if (partnerId) {
      partner = await PartnerModel.findById(partnerId);
    }
    let data = await BillBuyModel.create(bill);
    if (data) {
      if (status) {
        if (partner) {
          let totalBuy = partner.totalBuy;
          let newTotalBuy = totalBuy + data.totalPaidNeedPartner;
          if (totalDebtMath < 0) {
            let newTotalDebt =
              parseInt(partner.debt) + -parseInt(totalDebtMath);
            await PartnerModel.findByIdAndUpdate(
              { _id: partnerId },
              { debt: newTotalDebt, totalBuy: newTotalBuy }
            );
          }
          await PartnerModel.findByIdAndUpdate(
            { _id: partnerId },
            { totalBuy: newTotalBuy }
          );
        }
        if (listBuy.length > 0) {
          listBuy.forEach(async (product)=>{
            let dataFind= await ProductModel.findById(product._id)
            let newInventory=dataFind.inventory+product.countNum;
            await ProductModel.findByIdAndUpdate({_id:product._id},{inventory:newInventory})
          })
        }
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
      let idPartner = data.partnerId;

      if (idPartner) {
        let partner = await PartnerModel.findById(idPartner);
        let newTotalBuy = partner.totalBuy - data.totalPaidNeedPartner;
        let newDebt = partner.debt;
        if (data.totalDebtMath < 0) {
          newDebt = partner.debt + parseInt(data.totalDebtMath);
        }
        await PartnerModel.findByIdAndUpdate(
          { _id: idPartner },
          {
            totalBuy: newTotalBuy,
            debt: newDebt,
          }
        );
      }
      if (data.listBuy.length > 0) {
        data.listBuy.forEach(async (product)=>{
          let dataFind= await ProductModel.findById(product._id)
          let newInventory=dataFind.inventory-product.countNum;
          await ProductModel.findByIdAndUpdate({_id:product._id},{inventory:newInventory})
        })
      }
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
  getListBillBuyWithLimit,
  updateStatus,
  getBillWithIdPartner,
  getBillWithIdPartnerAndType
};
