const Calc = require("../controllers/Calc-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.post("/etp", authorize(), Calc.getETPOverTime);
router.post("/fito", authorize(), Calc.HorasFito);
router.post("/hum", authorize(), Calc.PHum);
router.post("/infec", authorize(), Calc.PInfec);
router.post("/humc", authorize(), Calc.Phumectacao);
router.post("/average", authorize(), Calc.averageTemp);

module.exports = router;