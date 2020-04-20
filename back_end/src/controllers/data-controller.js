const dataService = require("../services/data-Service.js");

exports.getData = (req, res) => {
    dataService.getData()
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.getDataSingle = (req, res) => {
    dataService.getDataSingle(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.insertData = (req, res) => {
    dataService.insertData(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.updateData = (req, res) => {
    dataService.updateData(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.removeData = (req, res) => {
    dataService.removeData(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};