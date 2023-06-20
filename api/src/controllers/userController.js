const User = require("../models/User");
const Plan = require("../models/Plan");
const CryptoJS = require("crypto-js");
const Razorpay = require("razorpay");
const Crypto = require("crypto");

async function getUserInfoHandler(req, res, next) {
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
  console.log("getUserInfoHandler: ", userData);
  res.status(200).json(userData);
}

async function updateUserInfoHandler(req, res, next) {
  console.log("updateUserInfoHandler:", req.body);
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

async function userPlanUpgradeHandler(req, res, next) {
  const razorInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  const { planName, pricingSchedule } = req.body;
  const plan = await Plan.findOne({ name: planName });

  let amount = 0;
  switch (pricingSchedule) {
    case "monthly":
      amount = Number(plan.pricePerMonth * 100); // Converting to the lowest denomination
      break;
    case "annually":
      amount = Number(plan.pricePerYear * 100); // Converting to the lowest denomination
      break;
    default:
      res.status(400).json({ msg: "PRICING SCHEDULE IS NOT VALID!" });
      return;
  }

  const order = await razorInstance.orders.create({
    amount,
    currency: "INR",
    notes: {
      planName: plan.name,
      pricingSchedule,
    },
  });
  res.status(200).json(order);
}

async function userPlanVerifyHandler(req, res, next) {
  const { username } = req.user;
  const {
    planName,
    pricingSchedule,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;
  if (!["monthly", "annually"].indexOf(pricingSchedule)) {
    res.status(400).json({ msg: "PRICING SCHEDULE IS NOT VALID!" });
    return;
  }

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const encryptedSign = Crypto.createHmac(
    "sha256",
    process.env.RAZORPAY_KEY_SECRET
  )
    .update(sign.toString())
    .digest("hex");

  if (encryptedSign !== razorpay_signature) {
    res.status(400).json({ msg: "PAYMENT SIGNATURE IS NOT VALID!" });
    return;
  }

  const subscription = {
    planName,
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    razorpaySignature: razorpay_signature,
  };
  console.log(`subscription: `, subscription);
  await User.findOneAndUpdate({ username }, { subscription });

  res.status(200).json({ success: true });
}

async function deleteUserInfoHandler(req, res, next) {
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
  userPlanUpgradeHandler,
  userPlanVerifyHandler,
  deleteUserInfoHandler,
};
