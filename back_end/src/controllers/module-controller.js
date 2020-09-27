const moduleService = require("../services/module-service.js");

exports.getModule = (req, res) => {
    moduleService.getModule()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getModuleSingle = (req, res) => {
    moduleService.getModuleSingle(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getModuleVinha = (req, res) => {
    moduleService.getModuleVinha(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getSecureModule = (req, res) => {
    moduleService.getSecureModule()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getSingleSecureModule = (req, res) => {
    moduleService.getSingleSecureModule(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.insertModule = (req, res) => {
    moduleService.insertModule(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.insertSecureModule = (req, res) => {
    moduleService.insertSecureModule(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.removeModule = (req, res) => {
    moduleService.removeModule(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.removeSecureModule = (req, res) => {
    moduleService.removeSecureModule(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.updateModule = (req, res) => {
    moduleService.updateModule(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};