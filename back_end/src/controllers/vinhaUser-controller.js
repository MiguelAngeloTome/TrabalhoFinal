const vinhaUserService = require("../services/vinhaUser-service.js");


exports.getVinha = (req, res) => {
    vinhaUserService.getVinha()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getVinhaSingle = (req, res) => {
    vinhaUserService.getVinhaSingle(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getModuleUsers = (req, res) => {
    vinhaUserService.getModuleUsers(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getUsersVinha = (req, res) => {
    vinhaUserService.getUsersVinha(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.add = (req, res) => {
    vinhaUserService.add(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({erro: err.message}));
};

exports.delete = (req, res) => {
    vinhaUserService.delete(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({erro: err.message}));
};