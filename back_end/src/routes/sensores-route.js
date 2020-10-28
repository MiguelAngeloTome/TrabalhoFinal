const sensoresController = require("../controllers/sensores-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

/* router.get("", authorize(), avisosController.getAvisos);
router.get("/prefs", authorize(), avisosController.getUserPrefs);
router.get("/:id", authorize(), avisosController.getAvisoSingle);
router.get("/user/:id", authorize(), avisosController.getUserAvisos);
router.get("/count/:id", authorize(), avisosController.countUserAvisos);
router.get("/module/:id", authorize(), avisosController.getModuleAvisos);
router.post("/prefs/", authorize(), avisosController.insertUserPrefs);
router.put("/prefs/single", authorize(), avisosController.getUserPrefsSingle);
router.put("/prefs/", authorize(), avisosController.updateUserPrefs);
router.delete("/remove/:id", authorize(), avisosController.removeAviso);
router.delete("/prefs/remove", authorize(), avisosController.removeUserPrefs); */

router.get("", authorize(), sensoresController.getSensores);
router.get("/:id", authorize(), sensoresController.getSensorSingle);
router.get("/module/:id", authorize(), sensoresController.getSensorModule);
router.post("", authorize(), sensoresController.insertSensor);
router.put("/:id", authorize(), sensoresController.updateSensor);
router.delete("/:id", authorize(), sensoresController.removeSensor);

module.exports = router;