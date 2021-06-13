const mongoose = require("../config/dbConnect");

let partnerSchema = mongoose.Schema(
  {
    code:{
      type:String,
      required:true
    },
    key:{
      type:String,
    },
    status:{
      type:Boolean,
      default:true
    },
    name: {
      type:String,
      required:true
    },
    nameCompany: {
      type:String,
      required:true
    },
    address:String,
    phone:{
      type:String,
    },
    email:{
      type:String,
    },
    history:{
      type:String,
    },
    debt:{
      type:Number,
      default:0
    },
    paidMoney:[
      {
        type:String,
      }
    ],
    totalBuy:{
      type:Number,
      default:0
    },
    note:{
      type:String,
    },
    listBill:[{
      type:String
  }]
  },
  {
    timestamps: true,
  }
);

let PartnerModel = mongoose.model("partner", partnerSchema);
module.exports = PartnerModel;
