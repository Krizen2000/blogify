const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const communityController = require("../controllers/communityController");

router.get("/", communityController.getAllCommunities);
router.get("/sort/popular", communityController.getPopularCommunities);
router.get("/sort/hidden", communityController.getHiddenCommunities);
router.get("/search", communityController.getCommunity);
router.post("/", verifyToken, communityController.createCommunity);
router.put("/:communityId", verifyToken, communityController.updateCommunity);
router.delete(
  "/:communityId",
  verifyToken,
  communityController.deleteCommunity
);

module.exports = router;
