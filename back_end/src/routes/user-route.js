const userController = require("../controllers/user-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.post("", userController.register);
router.post("/login", userController.login);
router.get("", userController.getUser);
router.get("/:id",userController.getUserSingle);
router.delete("/:id", userController.removeUser);
router.put("/:id", userController.updateUser);
router.get("/simple/get",userController.getUserSimple);

module.exports = router;