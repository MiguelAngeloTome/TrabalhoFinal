const ETP = require("../controllers/etp-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.post("", authorize(), ETP.getETPOverTime);

module.exports = router;