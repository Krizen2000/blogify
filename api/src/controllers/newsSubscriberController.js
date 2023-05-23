const NewsSubscriber = require("../models/NewsSubscriber");

async function createNewsSubscriber(req, res, next) {
  const newNewsSubscriber = new NewsSubscriber(req.body);

  newNewsSubscriber
    .save()
    .then(() => res.status(200))
    .catch((err) => res.status(500).json(err));
}

module.exports = {
  createNewsSubscriber,
};
