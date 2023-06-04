const router = require("express").Router();
const commentController = require("../controllers/commentController");
const commentGetRouter = require("../middleware/commentGetMiddleware");
const verifyToken = require("../middleware/verifyToken");

router.get(
  "/search",
  commentGetRouter,
  commentController.getCommentsByBlogId,
  commentController.getCommentsByUsername,
  commentController.getCommentsByCommunityId
);
router.post("/", verifyToken, commentController.createComment);

module.exports = router;
