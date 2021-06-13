const mongoose=require("../config/dbConnect");

let buyerSchema = mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    key:String,
    name:{
        type:String,
        required:true
    },
    age:String,
    sex:String,
    phone:String,
    address:String,
    note:String,
    debt:{
        type:Number,
        default:0
    },
    totalSell:{
        type:Number,
        default:0,
    },
    paid:[
        {
            type:String
        }
    ],
    listBill:[{
        type:String
    }]
},{
    timestamps: true,
});

let BuyerModel = mongoose.model("buyer", buyerSchema);
module.exports = BuyerModel;