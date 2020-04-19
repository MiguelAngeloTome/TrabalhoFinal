const moduleController = require("../controllers/module-controller.js");
const router = require("express").Router();

router.get("", moduleController.getModule);
//router.get("/:id",dataController.getData);
router.post("", moduleController.insertModule);
//router.put("/:id", dataController.updateData);
router.delete("/:id", moduleController.removeModule);

module.exports = router;