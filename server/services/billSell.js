const BillSellModel = require("../models/billSell");
const BuyerModel = require("../models/buyer");
const ProductModel = require("../models/product");
const AdjustDebtModel = require("../models/adjustDebt");
const PayBillModel = require("../models/payBill");
const {
  ERROR_SERVER,
  CREATE_BILL_SELL_SUCCESS,
  UPDATE_BILL_SELL_SUCCESS,
  DELETE_BILL_SELL_SUCCESS,
} = require("../utils/notify");
const { sortTimeArray } = require("../utils/time");

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
    let listBill = await BillSellModel.find({ status: true })
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
    let listBill = await BillSellModel.find({ status: status }).populate("buyerId").sort({
      createdAt: "desc",
    });
    res.status(200).json(listBill);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getBillWithId = async (req, res) => {
  try {
    let bill = await BillSellModel.findById(req.params.id).populate("buyerId");
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getBillWithIdBuyer = async (req, res) => {
  try {
    let buyerId = req.params.id;
    let bill = await BillSellModel.find({ buyerId: buyerId });
    res.status(200).json(bill).sort({ createdAt: "desc" });
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getBillWithIdBuyerAndType = async (req, res) => {
  try {
    let buyerId = req.params.id;
    let listBill = await BillSellModel.find({
      $and: [{ buyerId: buyerId }, { status: true }],
    }).sort({ updatedAt: "desc" });
    let listControl = await AdjustDebtModel.find({
      idPartner: buyerId,
      typePartner: "buyer",
    }).sort({ updatedAt: "desc" });
    let listPayBill = await PayBillModel.find({
      idBuyer: buyerId,
    }).sort({ updatedAt: "desc" });

    let copyListAllBill = [...listBill.concat(listControl).concat(listPayBill)];
    
    // let listAllBill = sortTimeArray(copyListAllBill);
    let listAllBill = copyListAllBill.reverse()
    res.status(200).json(listAllBill);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const updateStatus = async (req, res) => {
  try {
    let id = req.params.id;
    if (id) {
      let data = await BillSellModel.findByIdAndUpdate(
        { _id: id },
        { status: true }
      );
      if (data) {
        let idBuyer = data.buyerId;

        if (idBuyer) {
          let buyer = await BuyerModel.findById(idBuyer);
          let newTotalSell = buyer.totalSell + data.totalBuyerPaidNeed;
          let newDebt = buyer.debt;
          if (data.totalExcessPaid < 0) {
            newDebt = buyer.debt - parseInt(data.totalExcessPaid);
          }
          await BuyerModel.findByIdAndUpdate(
            { _id: idBuyer },
            {
              totalSell: newTotalSell,
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
  let buyer = "";
  try {
    let buyerId = req.body.buyerId;
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
    let typeSelectPay = req.body.typeSelectPay;
    let noteSell = req.body.noteSell;
    let status = req.body.status;
    let isDebt = true;
    if (totalExcessPaid >=0) {
      isDebt = false
    } 

    let bill = {
      buyerId,
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
      isDebt
    };
    if (buyerId) {
      buyer = await BuyerModel.findById(buyerId);
      bill.debtRedundancyBuyer = parseInt(buyer.debt) + totalBuyerPaidNeed;
     
    }
    let createdBill = await BillSellModel.create(bill);
    if (createdBill) {
      if (status) {
        if (buyer) {
          // Create new Debt after create bill
          // createdBill.debtRedundancyBuyer = parseInt(buyer.debt) + createdBill.totalBuyerPaidNeed;
          // await createdBill.save()

          // Create payBill
          let billPay = {
            code: createdBill.code,
            idBill: createdBill._id,
            idBuyer:createdBill.buyerId,
            createdHour: createdBill.createdHour,
            createdDay: createdBill.createdDay,
            userCreate: createdBill.userCreate,
            listPay: [
              {
                codeBill: createdBill.code,
                prizeBill: createdBill.totalBuyerPaidNeed,
                prePaid: 0,
                collectMoney: createdBill.totalBuyerPaid,
                createdHour: createdBill.createdHour,
                createdDay: createdBill.createdDay,
                status: true,
              },
            ],
            valuePay: createdBill.totalBuyerPaid,
            debtRedundancyBuyer: parseInt(buyer.debt) + -createdBill.totalExcessPaid,
            
          };

          let totalSell = buyer.totalSell;
          let newTotalSell = totalSell + createdBill.totalBuyerPaidNeed;

          if (createdBill.totalExcessPaid < 0) {
            // billPay.listPay[0].needCollectMoney=parseInt(-createdBill.totalExcessPaid)
            let createdPayBill = await PayBillModel.create(billPay);
            
            if (createdPayBill) {
              let newDebt = parseInt(buyer.debt) + -createdBill.totalExcessPaid;

              await BuyerModel.findByIdAndUpdate(
                { _id: buyerId },
                { debt: newDebt, totalSell: newTotalSell }
              );

              createdBill.idPayBill = createdPayBill._id;
              await createdBill.save()

            }
          } else if (createdBill.totalExcessPaid > 0) {
            // if (typeSelectPay == "debt") {
            //   billPay.listPay.push({
            //     prizeBill: 0,
            //     collectMoney: parseInt(createdBill.totalExcessPaid),
            //     createdHour: createdBill.createdHour,
            //     createdDay: createdBill.createdDay,
            //   });
            // }

            let createdPayBill = await PayBillModel.create(billPay);
            if (createdPayBill) {
              if (typeSelectPay == "debt") {
                let newDebt =
                  parseInt(buyer.debt) - createdBill.totalExcessPaid;
                await BuyerModel.findByIdAndUpdate(
                  { _id: buyerId },
                  { debt: newDebt, totalSell: newTotalSell }
                );
              } else {
    
                await BuyerModel.findByIdAndUpdate(
                  { _id: buyerId },
                  { totalSell: newTotalSell }
                );
              }

              createdBill.idPayBill = createdPayBill._id;
              await createdBill.save()
            }
          } else {
            let createdPayBill = await PayBillModel.create(billPay);
            if (createdPayBill) {
              await BuyerModel.findByIdAndUpdate(
                { _id: buyerId },
                { totalSell: newTotalSell }
              );

              createdBill.idPayBill = createdPayBill._id;
              await createdBill.save()
            }
          }
        }
        if (listSell.length > 0) {
          listSell.forEach(async (product) => {
            let dataFind = await ProductModel.findById(product._id);
            let newInventory = dataFind.inventory - product.countNum;

            await ProductModel.findByIdAndUpdate(
              { _id: product._id },
              { inventory: newInventory }
            );
          });
        }
      }
      return res.status(200).json(CREATE_BILL_SELL_SUCCESS);
    }
  } catch (error) {
    console.log(error);
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
      let idBuyer = data.buyerId;

      if (idBuyer) {
        let buyer = await BuyerModel.findById(idBuyer);
        let newTotalSell = buyer.totalSell - data.totalBuyerPaidNeed;
        let newDebt = buyer.debt;
        if (data.totalExcessPaid < 0) {
          newDebt = buyer.debt + parseInt(data.totalExcessPaid);
        }
        await BuyerModel.findByIdAndUpdate(
          { _id: idBuyer },
          {
            totalSell: newTotalSell,
            debt: newDebt,
          }
        );
      }
      if (data.listSell.length > 0) {
        data.listSell.forEach(async (product) => {
          let dataFind = await ProductModel.findById(product._id);
          let newInventory = dataFind.inventory + product.countNum;
          await ProductModel.findByIdAndUpdate(
            { _id: product._id },
            { inventory: newInventory }
          );
        });
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
  getListBillSell,
  getListBillSellWithLimit,
  getBillWithId,
  getListBillWithStatus,
  updateStatus,
  getBillWithIdBuyer,
  getBillWithIdBuyerAndType,
};
