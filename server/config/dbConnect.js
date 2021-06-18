const env =require("dotenv");
const mongoose = require('mongoose');

env.config();

if(process.env.MONGO_URI){
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:true }, (err) => {
    if (err) {
      console.log('Not connect to DB !');
      console.log(err);
      return;
    }
    console.log('CONNECTED TO MONGO CLOUD !');
  });
}else{
  console.log('Please config MONGO_URI in .env file !!!');
}


module.exports = mongoose;