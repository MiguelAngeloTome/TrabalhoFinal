const userController = require("../controllers/user-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("", userController.getUser);
router.post("/login", userController.login);
router.get("/:id",userController.getUserSingle);
router.post("", userController.register);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.removeUser);

module.exports = router;