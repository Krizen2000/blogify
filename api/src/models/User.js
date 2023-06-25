const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profession: { type: String },
  phoneNumber: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  discord: { type: String },
  linkedIn: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  commute: {
    type: [String],
    required: true,
    enum: ["None", "Email", "Discord", "LinkedIn", "Facebook", "Instagram"],
    default: "None",
  },
  subscription: {
    _id: false,
    planName: { type: String, required: true, default: "free" },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
