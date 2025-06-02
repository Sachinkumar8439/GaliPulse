const User = require("../models/user");
const Items = require("../models/items");

exports.addItem = async (req, res) => {
  try {
    const { name, location, description = "", price, tag } = req.body;
    const user = req.user.id;
    console.log(req.body);
    const userInDB = await User.findById(user);
    const newItem = new Items({
      name,
      location,
      description,
      price,
      tag,
    });

    const savedItem = await newItem.save();
    if (!savedItem) {
      return res.json({
        success: false,
        message: "Try again",
      });
    }

    const addItemToUser = await User.findByIdAndUpdate(
      { _id: user },
      { $push: { items: savedItem._id } },
      { new: true }
    ).populate("items");

    if (!addItemToUser) {
      await Items.findByIdAndDelete(savedItem._id);
      return res.json({
        success: false,
        message: "Item Not Added In user",
      });
    }

    return res.json({
      success: true,
      data: addItemToUser,
      message: "Ho Gaya Bhai",
    });
  } catch (e) {
    return res.json({
      success: false,
      message: e.message,
    });
  }
};
