const vinhaUserService = require("../services/vinhaUser-service");
const moduleService = require("../services/module-service")
const db = require('../configs/teste.js');

//Retorna todos os avisos
exports.getAvisos = () => {
    return new Promise((resolve, reject) => {
        db.query(`select * from avisos`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

//Retorna um aviso atraves do seu id
exports.getAvisoSingle = id => {
    return new Promise((resolve, reject) => {
        db.query(`select * from avisos 
                where id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
}

//Retorna todos os avisos de um user atraves do seu user id
exports.getUserAvisos = async (id) => {
    let vinhas = await vinhaUserService.getVinhaFromConnection(id);
    let modulos = [];
    let alertas = [];
    for (let i = 0; i < vinhas.length; i++) {
        let aux = await moduleService.getModuleVinha(vinhas[i].vinha_id);
        for (let j = 0; j < aux.length; j++) {
            modulos.push(aux[j].module_id);
        }
    }
    for (let k = 0; k < modulos.length; k++) {
        let aux2 = await this.getModuleAvisos(modulos[k]);
        for (let l = 0; l < aux2.length; l++) {
            alertas.push(aux2[l]);
        }
    }
    return alertas;
}

//Retorna o numero de avisos de um user atraves do seu user id
exports.countUserAvisos = async (id) => {
    let avisos = await this.getUserAvisos(id);
    let count = 0;
    for (let i = 0; i < avisos.length; i++) {
        count++;
    }
    return count;
    ;
}

//Retorna todos os avisos de um modulo atraves do module id
exports.getModuleAvisos = async (id) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from avisos 
                where module_id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
}

//Remover aviso
exports.removeAviso = id => {
    return new Promise((resolve, reject) => {
        db.query(`delete from avisos 
                where id = ?`, [id],
            err => {
                if (err) reject(err);
                resolve({ removed: 1, data_id: id });
            });
    });
};

exports.getUserPrefs = () => {
    return new Promise((resolve, reject) => {
        db.query(`select * from userPrefs`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

exports.getUserPrefsSingle = body => {
    return new Promise((resolve, reject) => {
        db.query(`select * from userPrefs
                where vinha_id = ? and
                user_id = ?`, [body.vinha_id, body.user_id], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

exports.insertUserPrefs = body => {
    return new Promise((resolve, reject) => {
        db.query(`insert into userPrefs(vinha_id, user_id, tempMin, tempMax, airHumidityMin, airHumidityMax, soloHumidityMin, soloHumidityMax, isWetMin, isWetMax, pluviosidadeMin, pluviosidadeMax, velVentoMin, velVentoMax, dirVentoMin, dirVentoMax, radiacaoMin, radiacaoMax)
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [body.vinha_id, body.user_id, body.tempMin, body.tempMax, body.airHumidityMin, body.airHumidityMax, body.soloHumidityMin, body.soloHumidityMax, body.isWetMin, body.isWetMax, body.pluviosidadeMin, body.pluviosidadeMax, body.velVentoMin, body.velVentoMax, body.dirVentoMin, body.dirVentoMax, body.radiacaoMin, body.radiacaoMax],
            err => {
                if (err) reject(err);
                resolve({ inserted: 1, vinha_id: body.vinha_id });
            });
    });
};

//Remover preferencias
exports.removeUserPrefs = body => {
    return new Promise((resolve, reject) => {
        db.query(`delete from userPrefs 
                where vinha_id = ? and
                user_id = ?`, [body.vinha_id, body.user_id],
            err => {
                if (err) reject(err);
                resolve({ removed: 1, vinha_id: body.vinha_id });
            });
    });
};

exports.updateUserPrefs = (body) => {
    return new Promise((resolve, reject) => {
        db.query(`update userPrefs set tempMin = ?, tempMax = ?, airHumidityMin = ?, airHumidityMax = ?, soloHumidityMin = ?, soloHumidityMax = ?, isWetMin = ?, isWetMax = ?, pluviosidadeMin = ?, pluviosidadeMax = ?, velVentoMin = ?, velVentoMax = ?, dirVentoMin = ?, dirVentoMax = ?, radiacaoMin = ?, radiacaoMax = ?
                  where vinha_id = ? and user_id = ?`, 
                [body.tempMin, body.tempMax, body.airHumidityMin, body.airHumidityMax, body.soloHumidityMin, body.soloHumidityMax, body.isWetMin, body.isWetMax, body.pluviosidadeMin, body.pluviosidadeMax, body.velVentoMin, body.velVentoMax, body.dirVentoMin, body.dirVentoMax, body.radiacaoMin, body.radiacaoMax, body.vinha_id, body.user_id],
            err => {
                if (err) reject(err);
                resolve({ updated: 1, vinha_id: body.vinha_id });
            });
    });
};