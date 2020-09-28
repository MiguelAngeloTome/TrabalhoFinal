const db = require('../configs/mysql.js');
const uuid = require('uuid').v4;
const moduleService = require("../services/module-service");
const vinhaService = require("../services/vinha-service");
const userService = require("../services/user-service");

//Retorna todos as conexões
exports.getConnection = () => {
    return new Promise((resolve, reject) => {
        db.all(`Select * from vinha_user`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

//Devolve todas as vinhas de um utilizador atraves do seu user_id
exports.getVinhaFromUser = async id => {
    let vinhas = await this.getVinhaFromConnection(id);
    let send = [];

    for (let i = 0; i < vinhas.length; i++) {
        let aux = await vinhaService.getVinhaSingle(vinhas[i].vinha_id)
        send.push(aux[0]);
        
    }
    return send;
}

//Retorna users que estejam associados a uma vinha atraves do vinha id
exports.getUserFromConnection = (id) => {
    return new Promise((resolve, reject) => {
        db.all(`select user_id from vinha_user
                where vinha_id = ?`, [id], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

//Retorna os vinhas ids associadas a um utilizador atraves do user_id
exports.getVinhaFromConnection = (id) => {
    return new Promise((resolve, reject) => {
        db.all(`select vinha_id from vinha_user
                where user_id = ?`, [id], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
}

//Retorna o vinha id, nome da vinha e os modulos associados a esta de um user atraves do seu user id 
exports.getVinhaInfoFromUsers = async id => {
    let connects = await this.getVinhaFromConnection(id);
    let vinha;
    let send = [];
    let modulos = [];
    for (let i = 0; i < connects.length; i++) {
        vinha = await vinhaService.getVinhaSingle(connects[i].vinha_id);
        modulos = await moduleService.getModuleVinha(vinha[0].vinha_id);
        send.push({ vinha_id: vinha[0].vinha_id, nome: vinha[0].Nome, modules: modulos });
    }
    return send;
}

//Retorna os users de uma vinha atraves do vinha id
exports.getUsersFromVinha = async id => {
    let users = await this.getUserFromConnection(id);
    let send = [];

    for (let i = 0; i < users.length; i++) {
        let aux = await userService.getUserSingle(users[i].user_id);
        send.push(aux[0]);
    }
    return send;
}

//Adiciona um conexao
exports.addConnection = body => {
    return new Promise((resolve, reject) => {
        const id = uuid();
        db.run(`insert into vinha_user(id, user_id, vinha_id) VALUES(?,?,?)`,
            [id, body.user_id, body.vinha_id],
            err => {
                if (err) reject(err);
                resolve({ inserted: 1 });
            });
    });
};

//Apaga uma conexao
exports.deleteConnection = body => {
    return new Promise((resolve, reject) => {
        db.run(`delete from vinha_user 
                where vinha_id = ? and user_id = ?`, [body.vinha_id, body.user_id],
            err => {
                if (err) reject(err);
                resolve({ removed: 1, vinha_id: body.vinha_id, user_id:body.user_id });
            });
    });
};