const mongoose=require("../config/dbConnect");

let UnitSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    key:String
},{
    timestamps: true,
});

let unitModel = mongoose.model("unit", UnitSchema);
module.exports = unitModel;