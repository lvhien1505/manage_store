const mongoose=require("../config/dbConnect");

let payBillSchema = mongoose.Schema({
    code:Number,
    idBill:{
        type:String,
        ref:"billSell"
    },
    idBuyer:{
        type:String,
    },
    createdHour:{
        type:String,
        required:true,
    },
    createdDay:{
        type:String,
        required:true,
    },
    userCreated:{
       type:String,
       default:"Tran Sang"
    },
    listPay:[{
       codeBill:String,
       prizeBill:Number,
       prePaid:Number,
       status:{
           type:Boolean,
           default:false
       },
       needCollectMoney:Number,
       collectMoney:Number,
       createdHour:String,
       createdDay:String
    }],
    valuePay:Number,
    debtRedundancyBuyer:{
        type:Number,
        default:0
    },
    note:String,
    typeOfBill:{
        type:String,
        default:"paybill"
    }

},{
    timestamps: true,
});


let payBillModel = mongoose.model("payBill", payBillSchema);
module.exports = payBillModel;