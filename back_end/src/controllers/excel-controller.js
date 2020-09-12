const excelService = require("../services/excel-service.js");

exports.Excel = (req, res) => {
    excelService.Excel(req.body, req.query.user_id, req.query.vinha_id, req.query.module_name, req.query.tipo)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};