const mongoose=require("../config/dbConnect");

let countSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        default:1
    }
},{
    timestamps: true,
});

let countModel = mongoose.model("count", countSchema);
module.exports = countModel;