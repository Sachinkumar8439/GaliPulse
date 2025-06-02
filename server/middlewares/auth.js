const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

exports.auth = async (req, res, next) => {
  try {
    console.log(req.cookies.token);
    const token =
      req.body.token ||
      req.cookies.token ||
      req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.json({
        success: false,
        message: "Token not found",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (e) {
      return res.json({
        success: false,
        message: "Error occured during token verification",
        error: e.message,
      });
    }

    next();
  } catch (e) {
    return res.json({
      success: false,
      message: "Error occured during auth middleware check",
      error: e.message,
    });
  }
};

exports.isBuyer = async (req, res, next) => {
  try {
    if (req.user.role !== "Buyer") {
      return res.json({
        success: false,
        message: "This route is only for Buyer",
      });
    }
    next();
  } catch (e) {
    return res.json({
      success: false,
      message: "Error occured during isBuyer middleware check",
      error: e.message,
    });
  }
};

exports.isSeller = async (req, res, next) => {
  try {
    if (req.user.role !== "Seller") {
      return res.json({
        success: false,
        message: "This route is only for Seller",
      });
    }
    next();
  } catch (e) {
    return res.json({
      success: false,
      message: "Error occured during isSeller middleware check",
      error: e.message,
    });
  }
};
