const moduleController = require("../controllers/module-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("", authorize(),moduleController.getModule);
router.get("/:id",authorize(),moduleController.getModuleSingle);
router.get("/vinha/:id",authorize(),moduleController.getModuleVinha);
router.get("/data/:id",authorize(),moduleController.getFirstDataModule);
router.post("", authorize(),moduleController.insertModule);
router.put("/:id", authorize(),moduleController.updateModule);
router.delete("/:id", authorize(),moduleController.removeModule);

module.exports = router;