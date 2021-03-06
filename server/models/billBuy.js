const mongoose=require("../config/dbConnect");
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose)

let billBuySchema = mongoose.Schema({
    code:{
        type:Number,
        required:true,
        default:1,
        unique:true
    },
    typeBill:{
        type:String
    },
    partnerId:String,
    partnerCode:String,
    namePartner:String,
    phone:String,
    address:String,
    status:{
        type:Boolean,
        default:false
    },
    createdHour:{
        type:String,
        required:true,
    },
    createdDay:{type:String,
        required:true,
    },
    userCreate:{
        type:String,
        default:"Admin - Tran Sang"
    },
    userSell:{
        type:String,
        default:"Tran Sang"
    },
    listBuy:{
        type:Array
    },
    countNumBuy:Number,
    totalMoneyBuy:Number,
    totalSaleOffMoneyBuy:Number,
    totalPaidNeedPartner:Number,
    totalMoneyPaid:Number,
    totalDebtMath:Number,
    noteBuy:String,
    debtRedundancy:{
        type:Number,
        default:0
    },
    historyChangeDebt:[{
        type:String
    }]
},{
    timestamps: true,
});

billBuySchema.plugin(autoIncrement.plugin,{ model: 'billBuy', field: 'code',startAt:1 })

let BillBuyModel = mongoose.model("billBuy", billBuySchema);
module.exports = BillBuyModel;