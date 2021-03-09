const PartnerModel = require("../models/partner");
const {
  ERROR_SERVER,
  CREATE_PARTNER_SUCCESS,
  UPDATE_PARTNER_SUCCESS,
  DELETE_PARTNER_SUCCESS,
  EXIST_CODE_PARTNER
} = require("../utils/notify");

const getListPartner = async (req, res) => {
  try {
    let partners = await PartnerModel.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const getPartnerWithId = async (req, res) => {
  try {
    let partner = await PartnerModel.findById(req.params.id);
    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};


const create = async (req, res) => {
  try {
    let code = req.body.code || "";
    let key = req.body.code || "";
    let name = req.body.name || "";
    let nameCompany = req.body.nameCompany || "";
    let phone = req.body.phone || "";
    let address = req.body.address || "";
    let email = req.body.email || "";
    let note = req.body.note || "";
    let existPartner =await PartnerModel.findOne({code:code});
    if (existPartner) {
      return res.status(400).json(EXIST_CODE_PARTNER)
    }
    let partner = {
      code,
      name,
      nameCompany,
      phone,
      address,
      email,
      note,
      key
    };
    let data = await PartnerModel.create(partner);
    if (data) {
      return res.status(200).json(CREATE_PARTNER_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let partner = {};
    if (req.body.name) {
      partner.name = req.body.name;
    }
    if (req.body.nameCompany) {
      partner.nameCompany = req.body.nameCompany;
    }
    if (req.body.phone) {
      partner.phone = req.body.phone;
    }
    if (req.body.email) {
      partner.email = req.body.email;
    }
    if (req.body.address) {
      partner.address = req.body.address;
    }
    if (req.body.note) {
      partner.note = req.body.note;
    }
    if (req.body.totalBuy) {
      partner.totalBuy = req.body.totalBuy;
    }
    if (req.body.status) {
      partner.status = req.body.status;
    }
    let data = await PartnerModel.findByIdAndUpdate({ _id: id }, partner);
    if (data) {
      return res.status(200).json(UPDATE_PARTNER_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

const remove = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await PartnerModel.findByIdAndDelete({ _id: id });
    if (data) {
      return res.status(200).json(DELETE_PARTNER_SUCCESS);
    }
  } catch (error) {
    res.status(500).json(ERROR_SERVER);
  }
};

module.exports = {
  create,
  update,
  remove,
  getListPartner,
  getPartnerWithId
};
