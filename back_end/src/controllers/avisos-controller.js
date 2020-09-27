const avisosService = require("../services/avisos-service.js");

exports.getAvisos = (req, res) => {
    avisosService.getAvisos()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getAvisoSingle = (req, res) => {
    avisosService.getAvisoSingle(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getUserAvisos = (req, res) => {
    avisosService.getUserAvisos(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.countUserAvisos = (req, res) => {
    avisosService.countUserAvisos(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getModuleAvisos = (req, res) => {
    avisosService.getModuleAvisos(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.removeAviso = (req, res) => {
    avisosService.removeAviso(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};