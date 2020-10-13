const ETP = require("../Calc/ETP.js");
const FITO = require("../Calc/HFito.js");
const FRIO = require("../Calc/HFrio.js");
const INFEC = require("../Calc/PInfeccao.js");
const CRESPUC = require("../Calc/TCrepuscular.js");

exports.getETPOverTime = async (req, res) => {
     await ETP.ETPOverTime(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};

exports.HorasFito = async (req, res) => {
    await FITO.FitoSend(req.body)
   .then(result => res.json(result))
   .catch(err => res.status(500).json({erro: err.message}));
};

exports.averageTemp = async (req, res) => {
    await FRIO.AverageSend(req.body)
   .then(result => res.json(result))
   .catch(err => res.status(500).json({erro: err.message}));
};

exports.PInfec = async (req, res) => {
    await INFEC.InfeccSend(req.body)
   .then(result => res.json(result))
   .catch(err => res.status(500).json({erro: err.message}));
};

exports.PHum = async (req, res) => {
    await INFEC.HumSend(req.body)
   .then(result => res.json(result))
   .catch(err => res.status(500).json({erro: err.message}));
};

exports.Phumectacao = async (req, res) => {
    await INFEC.HumectacaoSend(req.body)
   .then(result => res.json(result))
   .catch(err => res.status(500).json({erro: err.message}));
};

exports.TCrepuscular = async (req, res) => {
    await CRESPUC.TCrepuscSend(req.body)
   .then(result => res.json(result))
   .catch(err => res.status(500).json({erro: err.message}));
};