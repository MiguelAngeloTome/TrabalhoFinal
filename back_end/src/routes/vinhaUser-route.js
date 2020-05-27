const vinhaUserController = require("../controllers/vinhaUser-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("", authorize(),vinhaUserController.getVinha);
router.get("/getVinhaSingle/:id",authorize(),vinhaUserController.getVinhaSingle);
router.get("/getModuleUsers/:id",authorize(),vinhaUserController.getModuleUsers);
router.get("/getUsersVinha/:id",authorize(),vinhaUserController.getUsersVinha);
router.delete("/delete",authorize(),vinhaUserController.delete);
router.post("", vinhaUserController.add);
module.exports = router;