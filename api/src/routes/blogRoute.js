const router = require("express").Router();
const blogController = require("../controllers/blogController");
const verifyToken = require("../middleware/verifyToken");

router.get("/recent", blogController.getRecentBlogsHandler);
router.get("/all", blogController.getAllBlogsHandler);
router.get(
  "/publishedBy",
  verifyToken,
  blogController.getUserCreatedBlogsHandler
);
router.get("/find/:blogId", blogController.getBlogHandler);

router.post("/", verifyToken, blogController.createBlogHandler);
router.put("/:blogId", verifyToken, blogController.updateBlogHandler);
router.delete("/:blogId", verifyToken, blogController.deleteBlogHandler);

module.exports = router;
