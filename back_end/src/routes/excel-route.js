const excelController = require("../controllers/excel-controller.js");
const router = require("express").Router();
const authorize = require("../configs/authorization");

router.post("", authorize(), excelController.excel);
router.get("/send", authorize(), excelController.sendMail);
router.get("/email/:id", authorize(), excelController.getUserEmail);
router.get("/email/module/:id", authorize(), excelController.getUsersEmailsFromModule);

module.exports = router;