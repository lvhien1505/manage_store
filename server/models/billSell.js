const mongoose=require("../config/dbConnect");
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose)

let billSellSchema = mongoose.Schema({
    code:{
        type:Number,
        required:true,
        default:1,
        unique:true
    },
    buyerId:String,
    buyerCode:String,
    nameBuyer:String,
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
    listSell:{
        type:Array
    },
    countNumSell:Number,
    totalMoneySell:Number,
    totalSaleOffMoneySell:Number,
    totalBuyerPaidNeed:Number,
    totalBuyerPaid:Number,
    totalExcessPaid:Number,
    noteSell:String,
},{
    timestamps: true,
});

billSellSchema.plugin(autoIncrement.plugin,{ model: 'billSell', field: 'code',startAt:1 })

let BillSellModel = mongoose.model("billSell", billSellSchema);
module.exports = BillSellModel;