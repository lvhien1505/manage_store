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
    idPayBill:{
        type:String,
        ref:"payBill"
    },
    isDebt:{
        type:Boolean,
        default:true
    },
    buyerId:{
        type:String,
        ref:"buyer"
    },
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
        default:"Admin"
    },
    userSell:{
        type:String,
        default:"Admin"
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
    debtRedundancyBuyer:{
        type:Number,
        default:0
    },
    typeOfBill:{
        type:String,
        default:"bill"
    }
},{
    timestamps: true,
});

billSellSchema.plugin(autoIncrement.plugin,{ model: 'billSell', field: 'code',startAt:1 })

let BillSellModel = mongoose.model("billSell", billSellSchema);
module.exports = BillSellModel;