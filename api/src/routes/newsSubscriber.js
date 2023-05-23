const router = require("express").Router();
const newsSubscriberController = require("../controllers/newsSubscriberController");

router.post("/", newsSubscriberController.createNewsSubscriber);

module.exports = router;
