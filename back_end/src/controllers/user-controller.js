const userService = require("../services/user-Service.js");

exports.register = (req, res) => {
    userService
      .register(req.body.username, req.body.password, req.body.email, req.body.name)
      .then(() => res.sendStatus(200))
      .catch((message) => res.status(500).send(message));
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