const mongoose = require("mongoose");

const NewsSubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const NewsSubscriber = mongoose.model("NewsSubscriber", NewsSubscriberSchema);
module.exports = NewsSubscriber;
