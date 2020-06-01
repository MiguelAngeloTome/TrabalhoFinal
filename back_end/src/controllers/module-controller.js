const moduleService = require("../services/module-Service.js");

exports.getModule = (req, res) => {
    moduleService.getModule()
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.getModuleSingle = (req, res) => {
    moduleService.getModuleSingle(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.getModuleVinha = (req, res) => {
    moduleService.getModuleVinha(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.getFirstDataModule = (req, res) => {
    moduleService.getFirstDataModule(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.insertModule = (req, res) => {
    moduleService.insertModule(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.updateModule = (req, res) => {
    moduleService.updateModule(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.removeModule = (req, res) => {
    moduleService.removeModule(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};