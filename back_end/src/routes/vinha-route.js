const vinhaController = require("../controllers/vinha-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("", authorize(),vinhaController.getVinha);
router.get("/:id",authorize(),vinhaController.getVinhaSingle);
router.get("/dono/:id",authorize(),vinhaController.getDonoVinha);
router.post("", authorize(),vinhaController.insertVinha);
router.put("/:id", authorize(),vinhaController.updateVinha);
router.delete("/:id", authorize(),vinhaController.removeVinha);

module.exports = router;