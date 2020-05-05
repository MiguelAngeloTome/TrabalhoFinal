const userService = require("../services/user-Service.js");
const jwt = require("../helpers/jwt.js");

exports.register = (req, res) => {
    userService
        .register(req.body.username, req.body.password, req.body.email, req.body.name, req.body.type)
        .then(() => res.sendStatus(200))
        .catch((message) => res.status(500).send(message));
};

exports.login = (req, res) => {
    userService
        .authenticate(req.body.username, req.body.password)
        .then((payload) => jwt.createToken(payload))
        .then((data) => res.json(data))
        .catch((error) => res.status(500).send(error.message));
};

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

exports.updateUser = (req, res) => {
    userService.updateUser(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.removeUser = (req, res) => {
    userService.removeUser(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};