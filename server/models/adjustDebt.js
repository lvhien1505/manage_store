const mongoose=require("../config/dbConnect");
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose)
let adjustDebtSchema = mongoose.Schema({
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
    valueControl:{
        type:Number,
        required:true
    },
    note:String,
    typeBill:{
        type:String,
        default:"control"
     },
     typePartner:{
        type:String,
     },
     debtRedundancy:{
        type:Number,
        default:0
    },
    typeOfBill:{
        type:String,
        default:"adjustdebt"
    }

},{
    timestamps: true,
});

adjustDebtSchema.plugin(autoIncrement.plugin,{ model: 'adjustDebt', field: 'code',startAt:1 })

let adjustDebtModel = mongoose.model("adjustDebt", adjustDebtSchema);
module.exports = adjustDebtModel;