
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