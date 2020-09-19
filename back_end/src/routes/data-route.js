const dataController = require("../controllers/data-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("/avisos", authorize(), dataController.getAvisos);
router.get("", authorize(), dataController.getData);
router.get("/avisos/:id", authorize(), dataController.getAvisoSingle);
router.get("/:id", authorize(), dataController.getDataSingle);
router.get("/user/modulos/:id", authorize(), dataController.getModulosVinha)
router.get("/avisos/user/:id", authorize(), dataController.getUserAvisos);
router.get("/avisos/user/count/:id", authorize(), dataController.CountUserAvisos);
router.get("/module/:id", authorize(), dataController.getDataModule);
router.get("/last/:id", authorize(), dataController.getDataLast);
router.post("", authorize(), dataController.insertData);
router.post("/time/:id", authorize(), dataController.getDataTimeFrame);
router.put("/:id", authorize(), dataController.updateData);
router.delete("/:id", authorize(), dataController.removeData);
router.delete("/avisos/:id", authorize(), dataController.removeAviso);

module.exports = router;