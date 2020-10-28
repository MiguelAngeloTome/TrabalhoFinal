const sensoresService = require("../services/sensores-service.js");

exports.getSensores = (req, res) => {
    sensoresService.getSensores()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getSensorSingle = (req, res) => {
    sensoresService.getSensorSingle(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getSensorModule = (req, res) => {
    sensoresService.getSensorModule(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.removeSensor = (req, res) => {
    sensoresService.removeSensor(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.insertSensor = (req, res) => {
    sensoresService.insertSensor(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.updateSensor = (req, res) => {
    sensoresService.updateSensor(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};