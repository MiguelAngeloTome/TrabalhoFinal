const excelService = require("../services/excel-service.js");

exports.Excel = (req, res) => {
    excelService.Excel(req.body, req.query.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};