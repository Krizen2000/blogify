const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const communityController = require("../controllers/communityController");

router.get("/", communityController.getAllCommunities);
router.get("/search", communityController.getCommunity);
router.post("/", verifyToken, communityController.createCommunity);
router.put("/:communityId", verifyToken, communityController.updateCommunity);
router.delete(
  "/:communityId",
  verifyToken,
  communityController.deleteCommunity
);

module.exports = router;
