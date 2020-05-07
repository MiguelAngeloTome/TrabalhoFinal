const vinhaService = require("../services/vinha-Service.js");

exports.getVinha = (req, res) => {
    vinhaService.getVinha()
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.getVinhaSingle = (req, res) => {
    vinhaService.getVinhaSingle(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.insertVinha = (req, res) => {
    vinhaService.insertVinha(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.updateVinha = (req, res) => {
    vinhaService.updateVinha(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.removeVinha = (req, res) => {
    vinhaService.removeVinha(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};