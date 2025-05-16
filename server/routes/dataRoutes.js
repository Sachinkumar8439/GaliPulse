const express = require("express");
const dataroute = express.Router();
const bodyParser = require("body-parser");
const session = require("express-session");

const { SESSION_SECRET } = process.env;
dataroute.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

dataroute.use(bodyParser.json());
dataroute.use(bodyParser.urlencoded({ extended: true }));

const datacontroller = require("../Controllers/datacontroller")

dataroute.get("/products", datacontroller.loadproducts);

module.exports = dataroute;