const userController = require("../controllers/user-controller.js");
const router = require("express").Router();

router.get("", userController.getUser);
router.get("/:id",userController.getUserSingle);
router.post("", userController.insertUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.removeUser);

module.exports = router;