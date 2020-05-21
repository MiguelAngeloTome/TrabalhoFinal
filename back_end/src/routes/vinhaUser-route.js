const vinhaUserController = require("../controllers/vinhaUser-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("", authorize(),vinhaUserController.getVinha);
router.get("/:id",authorize(),vinhaUserController.getVinhaSingle);
router.post("", vinhaUserController.add);
module.exports = router;