const router = require("express").Router();
const commentController = require("../controllers/commentController");
const commentGetRouter = require("../middleware/commentGetMiddleware");

router.get(
  "/search",
  commentGetRouter,
  commentController.getCommentsByBlogId,
  commentController.getCommentsByUsername,
  commentController.getCommentsByCommunityId
);
router.post("/", commentController.createComment);

module.exports = router;
