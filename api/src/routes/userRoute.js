const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, userController.getUserInfoHandler);
router.put("/", verifyToken, userController.updateUserInfoHandler);
router.delete("/", verifyToken, userController.deleteUserInfoHandler);

module.exports = router;
