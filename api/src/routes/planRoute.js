const router = require("express").Router();
const planController = require("../controllers/planController");

router.get("/:planName", planController.getPlanHandler);
router.post("/", planController.createPlanHandler);

module.exports = router;
