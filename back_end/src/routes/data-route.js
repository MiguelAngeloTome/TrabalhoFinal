const dataController = require("../controllers/data-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("", authorize(), dataController.getData);
router.get("/:id", authorize(), dataController.getDataSingle);
router.get("/module/:id", authorize(), dataController.getDataModule);
router.get("/last/:id", authorize(), dataController.getDataModuloLast);
router.post("/time/:id", authorize(), dataController.getDataTimeFrame);
router.post("", authorize(), dataController.insertData);
router.delete("/:id", authorize(), dataController.removeData);
router.put("/:id", authorize(), dataController.updateData);

module.exports = router;