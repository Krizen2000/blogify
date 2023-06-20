const Plan = require("../models/Plan");

async function getPlanHandler(req, res, next) {
  let plan = null;
  try {
    plan = await Plan.findOne({ name: req.params.name });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
    return;
  }
  if (!plan) {
    res.status(404).json({ msg: "PLAN DOES NOT EXIST!" });
    return;
  }
  res.status(200).json(plan);
}

async function createPlanHandler(req, res, next) {
  const newPlan = new Plan(req.body);

  let savedPlan = null;
  try {
    savedPlan = await newPlan.save();
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
    return;
  }
  res.status(200).json(savedPlan.toObject());
}

module.exports = {
  getPlanHandler,
  createPlanHandler,
};
