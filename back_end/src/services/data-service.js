const db = require('../configs/mysql.js');

const uuid = require('uuid').v4;

exports.getData = () =>{
    return new Promise((resolve,reject)=>{
        db.all(`Select * From data`,(err,row)=>{
            if(err) reject (err);
            resolve(row);
        });
    });
}

exports.insertData = body =>{
    return new Promise((resolve,reject)=>{
        const id = uuid();
        db.run(`INSERT INTO data(data_id, Date, temp, air_humidity, solo_humidity, isWet, pluviosidade, vel_vento, dir_vento, radiacao) VALUES(?,?,?,?,?,?,?,?,?,?)`,
        [id, body.Date, body.temp, body.air_humidity, body.solo_humidity, body.isWet, body.pluviosidade, body.vel_vento, body.dir_vento, body.radiacao],
        err=>{
            if(err) reject (err);
            resolve({inserted:1, data_id: id});
        });
    });
};

exports.removeData = id =>{
    return new Promise((resolve,reject)=>{
        db.run(`DELETE FROM data where data_id = ?`, [id],
        err=>{
            if(err) reject (err);
            resolve({removed:1, data_id: id});
        });
    });
};

/*
getdata singlevalue
updateData
*/