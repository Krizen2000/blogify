const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profession: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  discord: { type: String, required: false },
  linkedIn: { type: String, required: false },
  facebook: { type: String, required: false },
  instagram: { type: String, required: false },
  commute: {
    type: [String],
    required: true,
    enum: ["None", "Email", "Discord", "LinkedIn", "Facebook", "Instagram"],
    default: "None",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
