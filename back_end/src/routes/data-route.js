const dataController = require("../controllers/data-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("", authorize(), dataController.getData);
router.get("/:id", authorize(), dataController.getDataSingle);
router.get("/module/:id", authorize(), dataController.getDataModule);
router.get("/last/:id", authorize(), dataController.getDataModuloLast);
router.post("", dataController.insertData);
router.post("/time/:id", authorize(), dataController.getDataTimeFrame);
router.put("/:id", authorize(), dataController.updateData);
router.delete("/:id", authorize(), dataController.removeData);

module.exports = router;