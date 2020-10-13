const riscos = require("../Riscos/riscos");

exports.RRajada = async (req, res) => {
     await riscos.RajadaSend(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.RIncendio = async (req, res) => {
    await riscos.RIncendioOverTime(req.body)
   .then(result => res.json(result))
   .catch(err => res.status(500).json({erro: err.message}));
};

exports.RGeada = async (req, res) => {
    await riscos.GeadaSend(req.body)
   .then(result => res.json(result))
   .catch(err => res.status(500).json({erro: err.message}));
};

exports.REnxurrada = async (req, res) => {
    await riscos.EnxurradaSend(req.body)
   .then(result => res.json(result))
   .catch(err => res.status(500).json({erro: err.message}));
};

