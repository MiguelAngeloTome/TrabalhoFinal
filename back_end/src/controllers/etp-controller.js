const ETP = require("../Calc/ETP");

exports.getETPOverTime = async (req, res) => {
     await ETP.ETPOverTime(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({erro: err.message}));
};