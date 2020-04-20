const db = require('../configs/mysql.js');

const uuid = require('uuid').v4;

exports.getData = () =>{
    return new Promise((resolve,reject)=>{
        db.all(`select * from data`,(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}

exports.getDataSingle = id =>{
    return new Promise((resolve,reject)=>{
        db.all(`select * from data where data_id = ?`, [id],
        (err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}

exports.insertData = body =>{
    return new Promise((resolve,reject)=>{
        const id = uuid();
        db.run(`insert into data(data_id, date, temp, air_humidity, solo_humidity, isWet, pluviosidade, vel_vento, dir_vento, radiacao) VALUES(?,?,?,?,?,?,?,?,?,?)`,
        [id, body.date, body.temp, body.air_humidity, body.solo_humidity, body.isWet, body.pluviosidade, body.vel_vento, body.dir_vento, body.radiacao],
        err=>{
            if(err) reject (err);
            resolve({inserted:1, data_id: id});
        });
    });
};

exports.removeData = id =>{
    return new Promise((resolve,reject)=>{
        db.run(`delete from data where data_id = ?`, [id],
        err=>{
            if(err) reject (err);
            resolve({removed:1, data_id: id});
        });
    });
};

exports.updateData = (id, body) =>{
    return new Promise((resolve,reject)=>{
        db.run(`update data set date = ?, temp = ?, air_humidity = ?, solo_humidity = ?, isWet = ?, pluviosidade = ?, vel_vento = ?, dir_vento = ?, radiacao = ? where data_id = ?`,
        [body.date, body.temp, body.air_humidity, body.solo_humidity, body.isWet, body.pluviosidade, body.vel_vento, body.dir_vento, body.radiacao, id],
        err=>{
            if(err) reject (err);
            resolve({updated:1, data_id: id});
        });
    });
};