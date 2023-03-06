const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

router.get("/:username", verifyToken, userController.getUserInfoHandler);
router.put("/:username", verifyToken, userController.updateUserInfoHandler);
router.delete("/:username", verifyToken, userController.deleteUserInfoHandler);

module.exports = router;
