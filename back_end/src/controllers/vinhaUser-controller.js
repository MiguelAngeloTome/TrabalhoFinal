const vinhaUserService = require("../services/vinhaUser-service.js");


exports.getVinha = (req, res) => {
    vinhaUserService.getVinha()
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.getVinhaSingle = (req, res) => {
    vinhaUserService.getVinhaSingle(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.add = (req, res) => {
    vinhaUserService.add(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};