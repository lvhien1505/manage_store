const mongoose=require("../config/dbConnect");

let billBuySchema = mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    key:String,
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
},{
    timestamps: true,
});

let BillBuyModel = mongoose.model("billBuy", billBuySchema);
module.exports = BillBuyModel;