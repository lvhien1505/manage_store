const mongoose=require("../config/dbConnect");
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose)
let paidDebtSchema = mongoose.Schema({
    code:{
        type:Number,
        required:true,
        default:1,
        unique:true
    },
    idPartner:String,
    createdHour:{
        type:String,
        required:true,
    },
    createdDay:{type:String,
        required:true,
    },
    userCreated:{
       type:String,
       default:"Tran Sang"
    },
    listBill:[{
       idBill:String,
       valueBill:Number,
       valueBillPrepay:Number,
       valueDebtNeedCollectRest:Number,
    }],
    valueDebt:{
        type:Number,
        required:true
    },
    typeBill:{
       type:String,
       default:"paid"
    },
    typePartner:{
        type:String,
    },
    debtRedundancy:{
        type:Number,
        default:0
    },
    note:String

},{
    timestamps: true,
});

paidDebtSchema.plugin(autoIncrement.plugin,{ model: 'paidDebt', field: 'code',startAt:1 })

let paidDebtModel = mongoose.model("paidDebt", paidDebtSchema);
module.exports = paidDebtModel;