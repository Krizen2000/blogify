const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  linkedIn: { type: String, required: false },
  facebook: { type: String, required: false },
  instagram: { type: String, required: false },
  commute: {
    type: String,
    required: true,
    enum: ["None", "Email", "LinkedIn", "Facebook", "Instagram"],
    default: "None",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
