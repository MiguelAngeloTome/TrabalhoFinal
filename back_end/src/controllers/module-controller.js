const moduleService = require("../services/module-Service.js");

exports.getModule = (req, res) => {
    moduleService.getModule()
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

/*exports.getData = (req, res) => {
    dataService.getdata(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};*/

exports.insertModule = (req, res) => {
    moduleService.insertModule(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

/*exports.updateData = (req, res) => {
    dataService.updatedata(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};*/

exports.removeModule = (req, res) => {
    moduleService.removeModule(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};