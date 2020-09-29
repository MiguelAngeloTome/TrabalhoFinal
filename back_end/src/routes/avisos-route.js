const avisosController = require("../controllers/avisos-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("", authorize(), avisosController.getAvisos);
router.get("/:id", authorize(), avisosController.getAvisoSingle);
router.get("/user/:id", authorize(), avisosController.getUserAvisos);
router.get("/count/:id", authorize(), avisosController.countUserAvisos);
router.get("/module/:id", authorize(), avisosController.getModuleAvisos);
router.delete("/remove/:id", authorize(), avisosController.removeAviso);

module.exports = router;