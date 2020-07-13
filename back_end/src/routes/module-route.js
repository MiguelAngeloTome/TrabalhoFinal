const moduleController = require("../controllers/module-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.get("", authorize(),moduleController.getModule);
router.get("/list",authorize(),moduleController.getSecureModule);
router.get("/:id",authorize(),moduleController.getModuleSingle);
router.get("/vinha/:id",authorize(),moduleController.getModuleVinha);
router.get("/data/:id",authorize(),moduleController.getFirstDataModule);
router.get("/secure/:id", authorize(),moduleController.getSingleSecureModule);
router.post("", authorize(),moduleController.insertModule);
router.post("/secure", authorize(),moduleController.insertSecureModule);
router.put("/:id", authorize(),moduleController.updateModule);
router.delete("/:id", authorize(),moduleController.removeModule);
router.delete("/secure/:id", authorize(),moduleController.removeSecureModule);

module.exports = router;