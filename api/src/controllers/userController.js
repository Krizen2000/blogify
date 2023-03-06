const User = require("../models/User");
const CryptoJS = require("crypto-js");

async function getUserInfoHandler() {
  let user = null;
  try {
    user = await User.findOne({ username: req.user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
    return;
  }
  if (!user) {
    res.status(404).json({ msg: "USER DOES NOT EXIST!" });
    return;
  }
  let { password, ...userData } = user.toObject();
  res.status(200).json(userData);
}

async function updateUserInfoHandler() {
  // Check if new username already exists
  if (req.body.username) {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        res.status(406).json({ msg: "USERNAME IS TAKEN!" });
        return;
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
      return;
    }
  }

  if (req.body.password) {
    req.body.password = CryptoJS.SHA256(req.body.password).toString(
      CryptoJS.enc.Base64
    );
  }

  let updatedUser;
  try {
    updatedUser = await User.findOneAndUpdate(
      { username: req.user.username },
      req.body
    );
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
    return;
  }
  if (!updatedUser) {
    res.status(500).json({ msg: "UPDATED USER NOT RETURNED!" });
    return;
  }
  res.status(200).json(updatedUser);
}

async function deleteUserInfoHandler() {
  try {
    await User.findOneAndDelete({ username: req.user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
    return;
  }
  res.status(200).json({ msg: "USER IS DELETED!" });
}

module.exports = {
  getUserInfoHandler,
  updateUserInfoHandler,
  deleteUserInfoHandler,
};
