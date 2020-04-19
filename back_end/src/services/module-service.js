const db = require('../configs/mysql.js');

const uuid = require('uuid').v4;

exports.getModule = () =>{
    return new Promise((resolve,reject)=>{
        db.all(`Select * From module`,(err,row)=>{
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

/*
getdata singlevalue
updateData
*/