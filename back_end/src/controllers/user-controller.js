const userService = require("../services/user-Service.js");

exports.getUser = (req, res) => {
    userService.getUser()
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.getUserSingle = (req, res) => {
    userService.getUserSingle(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

exports.insertUser = (req, res) => {
    userService.insertUser(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};

/*exports.updateData = (req, res) => {
    dataService.updatedata(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};*/

exports.removeUser = (req, res) => {
    userService.removeUser(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err.message));
};