const db = require('../configs/mysql.js');

const uuid = require('uuid').v4;

exports.getModule = () =>{
    return new Promise((resolve,reject)=>{
        db.all(`Select * from module`,(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}

exports.getModuleSingle = id =>{
    return new Promise((resolve,reject)=>{
        db.all(`Select * from module where module_id = ?`, [id],
        (err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}

exports.insertModule = body =>{
    return new Promise((resolve,reject)=>{
        const id = uuid();
        db.run(`insert into module(module_id, localizacao, dono) VALUES(?,?,?)`,
        [id, body.localizacao, body.dono],
        err=>{
            if(err) reject (err);
            resolve({inserted:1, module_id: id});
        });
    });
};

exports.removeModule = id =>{
    return new Promise((resolve,reject)=>{
        db.run(`delete from module where module_id = ?`, [id],
        err=>{
            if(err) reject (err);
            resolve({removed:1, module_id: id});
        });
    });
};

exports.updateModule = (id, body) =>{
    return new Promise((resolve,reject)=>{
        db.run(`update module set localizacao = ?, dono = ? where module_id = ?`,
        [body.localizacao, body.dono, id],
        err=>{
            if(err) reject (err);
            resolve({updated:1, module_id: id});
        });
    });
};