const mongoose = require('mongoose');
const Item = require('./items');

const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
    },

    lastName:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },

    contactNo:{
        type:String,
        required:true,
    },

    role:{
        type:String,
        enum:["Seller","Buyer"],
        required:true,
    },

    items:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Item"
        }
    ],


});


const user = mongoose.model("User",userSchema);
module.exports = user;