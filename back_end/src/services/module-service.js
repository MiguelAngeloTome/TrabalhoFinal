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

exports.getFirstDataModule = id =>{
    return new Promise((resolve,reject)=>{
        db.all(`Select * from data where module_id = ? `, [id],
        (err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}

exports.getModuleVinha = id =>{
    return new Promise((resolve,reject)=>{
        db.all(`Select * from module where vinha_id = ?`, [id],
        (err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}

exports.insertModule = body =>{
    return new Promise((resolve,reject)=>{
        const id = uuid();
        db.run(`insert into module(module_id, vinha_id, localizacao, coordenadas) VALUES(?,?,?,?)`,
        [id, body.vinha_id, body.localizacao, body.coordenadas],
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
        db.run(`update module set vinha_id = ?, localizacao = ? where module_id = ?`,
        [body.vinha_id, body.localizacao, id],
        err=>{
            if(err) reject (err);
            resolve({updated:1, module_id: id});
        });
    });
};