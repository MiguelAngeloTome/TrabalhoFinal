const db = require('../configs/mysql.js');

const uuid = require('uuid').v4;

exports.getVinha = () =>{
    return new Promise((resolve,reject)=>{
        db.all(`Select * from vinha`,(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}

exports.getVinhaSingle = id =>{
    return new Promise((resolve,reject)=>{
        db.all(`Select * from vinha where vinha_id = ?`, [id],
        (err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}

exports.insertVinha = body =>{
    return new Promise((resolve,reject)=>{
        const id = uuid();
        db.run(`insert into vinha(vinha_id, Nome, coordenadas, localizacao, dono) VALUES(?,?,?,?,?)`,
        [id, body.nome ,body.coordenadas, body.localizacao, body.dono],
        err=>{
            if(err) reject (err);
            resolve({inserted:1, vinha_id: id});
        });
    });
};

exports.removeVinha = id =>{
    return new Promise((resolve,reject)=>{
        db.run(`delete from vinha where vinha_id = ?`, [id],
        err=>{
            if(err) reject (err);
            resolve({removed:1, vinha_id: id});
        });
    });
};

exports.updateVinha = (id, body) =>{
    return new Promise((resolve,reject)=>{
        db.run(`update vinha set localizacao = ?, Nome = ?, coordenadas = ? where vinha_id = ?`,
        [body.localizacao, body.nome, body.coordenadas, id],
        err=>{
            if(err) reject (err);
            resolve({updated:1, vinha_id: id});
        });
    });
};