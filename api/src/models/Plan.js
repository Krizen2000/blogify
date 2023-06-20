const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  pricePerMonth: { type: Number, required: true },
  pricePerYear: { type: Number, required: true },
});

const Plan = mongoose.model("Plan", PlanSchema);
module.exports = Plan;
