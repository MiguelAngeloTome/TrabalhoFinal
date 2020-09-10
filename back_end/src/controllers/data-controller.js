const dataService = require("../services/data-service.js");

exports.getData = (req, res) => {
    dataService.getData()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getAvisos = (req, res) => {
    dataService.getAvisos()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getUserAvisos = (req, res) => {
    dataService.getUserAvisos(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.CountUserAvisos = (req, res) => {
    dataService.CountUserAvisos(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getDataSingle = (req, res) => {
    dataService.getDataSingle(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getAvisoSingle = (req, res) => {
    dataService.getDataSingle(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getDataModule = (req, res) => {
    dataService.getDataModule(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getDataLast = (req, res) => {
    dataService.getDataLast(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getDataTimeFrame = (req, res) => {
    dataService.getDataTimeFrame(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.insertData = (req, res) => {
    dataService.insertData(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.updateData = (req, res) => {
    dataService.updateData(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.removeData = (req, res) => {
    dataService.removeData(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.removeAviso = (req, res) => {
    dataService.removeAviso(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};