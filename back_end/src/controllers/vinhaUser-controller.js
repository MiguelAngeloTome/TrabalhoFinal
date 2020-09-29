const vinhaUserService = require("../services/vinhaUser-service.js");


exports.getConnection = (req, res) => {
    vinhaUserService.getConnection()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getVinhaFromUser = (req, res) => {
    vinhaUserService.getVinhaFromUser(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getUserFromConnection = (req, res) => {
    vinhaUserService.getUserFromConnection(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getVinhaFromConnection = (req, res) => {
    vinhaUserService.getVinhaFromConnection(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getVinhaInfoFromUsers = (req, res) => {
    vinhaUserService.getVinhaInfoFromUsers(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.getUsersFromVinha = (req, res) => {
    vinhaUserService.getUsersFromVinha(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.addConnection = (req, res) => {
    vinhaUserService.addConnection(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({erro: err.message}));
};

exports.deleteConnection = (req, res) => {
    vinhaUserService.deleteConnection(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({erro: err.message}));
};