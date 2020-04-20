const moduleController = require("../controllers/module-controller.js");
const router = require("express").Router();

router.get("", moduleController.getModule);
router.get("/:id",moduleController.getModuleSingle);
router.post("", moduleController.insertModule);
router.put("/:id", moduleController.updateModule);
router.delete("/:id", moduleController.removeModule);

module.exports = router;