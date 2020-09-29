const excelService = require("../services/excel-service.js");

exports.excel = (req, res) => {
    excelService.excel(req.body, req.query.user_id, req.query.vinha_id, req.query.module_name, req.query.tipo)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.sendMail = (req, res) => {
    excelService.sendMail(req.query.mail)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getUserEmail = (req, res) => {
    excelService.getUserEmail(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getUsersEmailsFromModule = (req, res) => {
    excelService.getUsersEmailsFromModule(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};