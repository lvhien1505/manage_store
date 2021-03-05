const mongoose=require("../config/dbConnect");

let transactionSchema = mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    key:String,
    buyer:{
        type:String,
        ref:"buyer"
    },
    products:[
        {
            type:String,
            ref:"product"
        }
    ],
    dayTransaction:{
        type:String,
        required:true
    },
    totalMoney:{
        type:String,
        required:true
    },
    debtMoney:String,
    paidMoney:String
},{
    timestamps: true,
});

let TransactionModel = mongoose.model("transaction", transactionSchema);
module.exports = TransactionModel;