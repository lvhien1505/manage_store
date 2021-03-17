const express=require("express");
const cors=require("cors");
const env=require("dotenv");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const morgan=require("morgan");
const  path =require("path")

//routes
const indexRoute = require("./routes/index") 
const partnerRoute = require("./routes/partner");
const categoryRoute = require("./routes/categoryProduct"); 
const unitRoute = require("./routes/unit"); 
const buyerRoute = require("./routes/buyer");
const billSellRoute = require("./routes/billSell");
const billBuyRoute = require("./routes/billBuy");
const productRoute = require("./routes/product");
const transactionRoute = require("./routes/transaction");


env.config();

const app=express();
//{origin:true,credentials:true}
app.use(cors({origin:true,credentials:true}));
app.use(morgan("dev"));


// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cookie-parser
app.use(cookieParser());

//public file

app.use("/public", express.static(path.join(__dirname ,"public")));

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

//routers
app.use("/",indexRoute);
app.use("/partner",partnerRoute);
app.use("/category",categoryRoute)
app.use("/unit",unitRoute)
app.use("/buyer",buyerRoute);
app.use("/bill-sell",billSellRoute);
app.use("/bill-buy",billBuyRoute);
app.use("/product",productRoute);
app.use("/transaction",transactionRoute);



const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("App is running...");
})



