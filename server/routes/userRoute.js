const express = require("express");
const userroute = express.Router();
const bodyParser = require("body-parser");
const session = require("express-session");
const Usercontroller = require("../Controllers/usercontroller")

const { SESSION_SECRET } = process.env;
userroute.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// userroute.use(cors())
userroute.use(express.json());
userroute.use(express.urlencoded({ extended: true }));

// userroute.get('/',async (req,res)=>{
//     console.log('welcome to the beckend');})

userroute.post("/createuser", Usercontroller.createuser);
userroute.post("/loginuser", Usercontroller.loginuser);

module.exports = userroute;
