const excelController = require("../controllers/excel-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.post("", authorize(), excelController.Excel);

module.exports = router;