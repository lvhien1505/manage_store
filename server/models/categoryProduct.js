const mongoose=require("../config/dbConnect");

let categoryProductSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    key:String
},{
    timestamps: true,
});

let categoryModel = mongoose.model("categoryProduct", categoryProductSchema);
module.exports = categoryModel;