const express = require("express");
const router = express.Router();

const { SignUp, LogIn } = require("../controllers/auth");

const { addItem } = require("../controllers/item");

const { isBuyer, isSeller, auth } = require("../middlewares/auth");

router.post("/sign-up", SignUp);
router.post("/log-in", LogIn);

router.post("/add-item", auth, addItem);

module.exports = router;
