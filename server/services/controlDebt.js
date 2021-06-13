const ControlDebtModel = require("../models/controlDebt");
const { ERROR_SERVER } = require("../utils/notify");

const getListControlDebtWithIdAndType = async (req, res) => {
  try {
      let idPartner = req.body.idPartner;
    let list = await ControlDebtModel.find({
        idPartner:idPartner
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
    let valueControl = req.body.valueControl;
    let note = req.body.note;
    let controlDebt = {
      idPartner,
      listBill,
      createdHour,
      createdDay,
      valueControl,
      note,
      typePartner
    };
    let data = await ControlDebtModel.create(controlDebt);
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
    let data = await ControlDebtModel.findByIdAndDelete({ _id: id });
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
  getListControlDebtWithIdAndType,
};
