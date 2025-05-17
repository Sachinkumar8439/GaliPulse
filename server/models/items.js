const mongoose = require('mongoose');
const User = require("./user");

const itmeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },

    location:{
        latitude:{
            type:String,
            required:true,
        },
        longitude:{
            type:String,
            required:true,
        }
    },

    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]

});


const item = mongoose.model("Item",itmeSchema);
module.exports = item;