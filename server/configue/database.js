const mongoose = require("mongoose");
require("dotenv").config();

const DATABASE_URL = process.env.DATABASE_URL;
const databaseConnect = () =>{
    // console.log(DATABASE_URL)
    mongoose.connect(DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(() =>{
        console.log("DATABASE CONNECTED");
    }).catch((e) =>{
        console.log(e.message);
    })
}

module.exports = databaseConnect;