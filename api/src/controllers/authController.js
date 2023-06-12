const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_KEY = process.env.JWT_KEY || "juan";

const registerHandler = async (req, res, next) => {
  console.log("Register Data:", req.body);
  const hashedPassword = CryptoJS.SHA256(req.body.password).toString(
    CryptoJS.enc.Base64
  );
  req.body.password = hashedPassword;

  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    console.log(savedUser);

    const token = jwt.sign(
      {
        userId: savedUser._id,
        username: savedUser.username,
      },
      JWT_KEY
    );

    const { password, ...userInfo } = savedUser.toObject();
    res.status(201).json({ ...userInfo, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const loginHandler = async (req, res, next) => {
  try {
    let user = req.body.username
      ? await User.findOne({ username: req.body.username })
      : req.body.email
      ? await User.findOne({ email: req.body.email })
      : await User.findOne({ phoneNumber: req.body.phoneNumber });

    const loginPassword = CryptoJS.SHA256(req.body.password).toString(
      CryptoJS.enc.Base64
    );

    if (user.password !== loginPassword) {
      res.status(401).json({ msg: "PASSWORD MISMATCH!" });
      console.error(
        "Storedpass: "
          .concat(user.password)
          .concat(" GivenPass: ")
          .concat(loginPassword)
      );
      return;
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      JWT_KEY
    );

    const { password, ...userInfo } = user.toObject();
    res.status(200).json({ ...userInfo, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { registerHandler, loginHandler };
