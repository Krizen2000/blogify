const router = require("express").Router();
const blogController = require("../controllers/blogController");
const verifyToken = require("../middleware/verifyToken");

router.get("/recent", blogController.getRecentBlogsHandler);
router.get("/all", blogController.getAllBlogsHandler);
router.get("/publishedBy", blogController.getPublisherCreatedBlogsHandler);
router.get("/find/:blogId", blogController.getBlogHandler);

router.post("/", verifyToken, blogController.createBlogHandler);
router.put("/:blogId/like", verifyToken, blogController.likeBlogHandler);
router.put("/:blogId", verifyToken, blogController.updateBlogHandler);
router.delete("/:blogId", verifyToken, blogController.deleteBlogHandler);

module.exports = router;
