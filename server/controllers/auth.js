const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.SignUp = async (req, res) => {
  try {
    console.log("heloo jii");
    const { firstName, lastName, email, password, role } = req.body;
    const isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
      return res.json({
        success: false,
        message: "User Already Exist",
      });
    }

    // we just storing the password, we're not gonna hash password for small task
    const newUser = new User({ firstName, lastName, email, password, role });
    const userAdded = await newUser.save();
    if (!userAdded) {
      return res.json({
        success: false,
        message: "Something Went Wrong Plz Try Again Later",
      });
    }

    return res.json({
      success: true,
      message: "Sign Up Successfully",
      user: userAdded,
    });
  } catch (e) {
    res.json({
      succcess: false,
      message: e.message,
      where: "Inside catch",
    });
  }
};

exports.LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await User.findOne({ email: email }).populate("items");
    if (!isUserExist) {
      return res.json({
        success: false,
        message: "User Not Found, SignUp First",
      });
    }

    if (password !== isUserExist.password) {
      return res.json({
        success: false,
        message: "Password Not Matched",
      });
    }

    const payload = {
      email: isUserExist.email,
      id: isUserExist._id,
      role: isUserExist.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "5h",
    });

    req.isUserExist = token;
    // const user = { ...isUserExist._doc, token: token };
    // user.token = token;
    // console.log("token:",token);
    // req.user = user;
    // console.log("user data inside login:", req.user);
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    return res.cookie("token", token, options).json({
      success: true,
      message: "Logged In Successfully",
      user: isUserExist,
      token: token,
    });
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};
