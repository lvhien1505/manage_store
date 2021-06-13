const mongoose=require("../config/dbConnect");
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose)
let controlDebtSchema = mongoose.Schema({
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
    }

},{
    timestamps: true,
});

controlDebtSchema.plugin(autoIncrement.plugin,{ model: 'controlDebt', field: 'code',startAt:1 })

let controlDebtModel = mongoose.model("controlDebt", controlDebtSchema);
module.exports = controlDebtModel;