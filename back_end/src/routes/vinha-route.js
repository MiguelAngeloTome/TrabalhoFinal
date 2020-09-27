const vinhaController = require("../controllers/vinha-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("", authorize(),vinhaController.getVinha);
router.get("/:id",authorize(),vinhaController.getVinhaSingle);
router.get("/module/:id",authorize(),vinhaController.getVinhaFromModule);
router.get("/dono/:id",authorize(),vinhaController.getDonoVinha);
router.get("/name/:id",authorize(),vinhaController.getVinhaName);
router.post("", authorize(),vinhaController.insertVinha);
router.delete("/:id", authorize(),vinhaController.removeVinha);
router.put("/:id", authorize(),vinhaController.updateVinha);

module.exports = router;