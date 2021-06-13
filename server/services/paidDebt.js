const PaidDebtModel = require("../models/paidDebt");
const { ERROR_SERVER } = require("../utils/notify");

const getListPaidDebtWithIdAndType = async (req, res) => {
  try {
      let idPartner = req.body.idPartner;
      let typeDebt = req.body.typeDebt;
    let list = await PaidDebtModel.find({
        $and:[{idPartner:idPartner},{typeDebt:typeDebt}]
    });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};


const create = async (req, res) => {
  try {
    let idPartner = req.body.idPartner || "";
    let typePartner = req.body.typePartner || "";
    let createdHour = req.body.createdHour;
    let createdDay = req.body.createdDay;
    let listBill = req.body.listBill;
    let typeDebt = req.body.typeDebt;
    let note = req.body.note;
    let paidDebt = {
      idPartner,
      listBill,
      createdHour,
      createdDay,
      typeDebt,
      note,
      typePartner
    };

    let data = await PaidDebtModel.create(paidDebt);
    if (data) {
      return res.status(200).json({
          message:"oke"
      });
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};



const remove = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await PaidDebtModel.findByIdAndDelete({ _id: id });
    if (data) {
      return res.status(200).json({
          mesage:"oke"
      });
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

module.exports = {
  create,
  remove,
  getListPaidDebtWithIdAndType,
};
