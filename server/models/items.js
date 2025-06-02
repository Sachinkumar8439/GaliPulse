const mongoose = require("mongoose");
const User = require("./user");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  location: {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },

  price: {
    type: Number,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  description: {
    type: String,
  },

  tag: {
    type: String,
    required: true,
  },
});

const item = mongoose.model("Item", itemSchema);
module.exports = item;
