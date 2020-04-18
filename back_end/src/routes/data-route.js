const dataController = require("../controllers/data-controller.js");
const router = require("express").Router();

router.get("", dataController.getData);
//router.get("/:id",dataController.getData);
router.post("", dataController.insertData);
//router.put("/:id", dataController.updateData);
router.delete("/:id", dataController.removeData);

module.exports = router;