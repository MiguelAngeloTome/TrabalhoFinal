
const uuid = require('uuid').v4;

const db = require('../configs/teste.js');

//Retorna todas as vinhas
exports.getVinha = () => {
    return new Promise((resolve, reject) => {
        db.query(`Select * from vinha`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

//Retorna uma vinha atraves do seu id
exports.getVinhaSingle = id => {
    return new Promise((resolve, reject) => {
        db.query(`Select * from vinha 
                where vinha_id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
}

//Retorna o vinha id de um modulo que lhe esteje associado atraves do module id
exports.getVinhaFromModule = id => {
    return new Promise((resolve, reject) => {
        db.query(`select vinha_id from module
                where module_id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
}

//Retorna o dono de uma vinha atraves do vinha id
exports.getDonoVinha = id => {
    return new Promise((resolve, reject) => {
        db.query(`Select dono from vinha 
                where vinha_id = ?`, [id],
            (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
    });
}

//Retorna o nome de uma vinha atraves do seu vinha id
exports.getVinhaName = async (id) => {
    return new Promise((resolve, reject) => {
        db.query(`select nome from vinha
                where vinha_id = ?`, [id],
            (err, row) => {
                if (err)
                    reject(err)
                resolve(row);
            });
    });
}

//Inserir uma vinha
exports.insertVinha = body => {
    return new Promise((resolve, reject) => {
        const id = uuid();
        db.query(`insert into vinha(vinha_id, Nome, lat, lng, localizacao, dono) VALUES(?,?,?,?,?,?)`,
            [id, body.nome, body.lat, body.lng, body.localizacao, body.dono],
            err => {
                if (err) reject(err);
                resolve({ inserted: 1, vinha_id: id });
            });
    });
};

//Remover uma vinha
exports.removeVinha = id => {
    return new Promise((resolve, reject) => {
        db.query(`delete from vinha where vinha_id = ?`, [id],
            err => {
                if (err) reject(err);
                resolve({ removed: 1, vinha_id: id });
            });
    });
};

//Update de uma vinha
exports.updateVinha = (id, body) => {
    return new Promise((resolve, reject) => {
        db.query(`update vinha set localizacao = ?, Nome = ?, lat = ? , lng = ? where vinha_id = ?`,
            [body.localizacao, body.nome, body.lat, body.lng, id],
            err => {
                if (err) reject(err);
                resolve({ updated: 1, vinha_id: id });
            });
    });
};