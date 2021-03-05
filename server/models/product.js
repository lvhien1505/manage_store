const mongoose=require("../config/dbConnect");

let productSchema = mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    key:String,
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        ref:"categoryProduct"
    },
    image:{
        type:String,
    },
    inventory:{
        type:Number,
        default:0
    },
    unit:{
        type:String,
        ref:"unit"
    },
    moneyIn:{
        type:Number,
        required:true,
        default:0
    },
    moneyOut:{
        type:Number,
        required:true,
        default:0
    },
    image:String
},{
    timestamps: true,
});

let ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;