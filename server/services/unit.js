const UnitModel = require("../models/unit");
const {
  ERROR_SERVER,
  CREATE_UNIT_SUCCESS,
  UPDATE_UNIT_SUCCESS,
  DELETE_UNIT_SUCCESS
} = require("../utils/notify");


const getListUnit = async (req, res) => {
  try {
    let units = await UnitModel.find();
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getUnitWithId = async (req, res) => {
  try {
    let unit = await UnitModel.findById(req.params.id);
    if (unit) {
      res.status(200).json(unit);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const create = async (req, res) => {
  try {
    let name = req.body.name || "";
    let key=req.body.name || "";
    let unit = {
      name,
      key
    };
    let data = await UnitModel.create(unit);
    if (data) {
      return res.status(200).json(CREATE_UNIT_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let key =req.params.id;
    let unit = {};
    if (req.body.name) {
      unit.name = req.body.name;
    }
    if (key) {
      unit.key = key;
    }
    let data = await UnitModel.findByIdAndUpdate({ _id: id }, unit);
    if (data) {
      return res.status(200).json(UPDATE_UNIT_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const remove = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await UnitModel.findByIdAndDelete({ _id: id });
    if (data) {
      return res.status(200).json(DELETE_UNIT_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

module.exports = {
  create,
  update,
  remove,
  getListUnit,
  getUnitWithId
};
