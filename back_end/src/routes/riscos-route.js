const risco = require("../controllers/riscos-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.post("/rajada", authorize(), risco.RRajada);
router.post("/incendio", authorize(), risco.RIncendio);
router.post("/geada", authorize(), risco.RGeada);
router.post("/enxurrada", authorize(), risco.REnxurrada);


module.exports = router;